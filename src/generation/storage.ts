import {CArgument, CVariable, CDeclaration} from "../tree/declarations";
import {CExpression} from "../tree/expressions";
import * as e from "../tree/expressions";
import {Scope} from "../tree/scope";
import {CType, CArithmetic} from "../tree/types";
import {Instructions, i32Type} from "../wasm";
import {localidx} from "../wasm/base_types";
import {WExpression, WInstruction} from "../wasm/instructions";
import {WFnGenerator, WGenerator} from "./generator";
import {staticInitializer} from "./static_initializer";
import {realType} from "./type_conversion";

export type StorageLocation =
    {type: "local", "index": {getIndex(d: number): localidx}} |
    {type: "static", "address": number} |
    {type: "pointer"}; // address on stack

export function storageSetupStaticVar(ctx: WGenerator, d: CVariable): void {
    const addr = ctx.nextStaticAddr;
    setStorageLocation(d, {
        type: "static",
        address: addr
    });
    if (d.staticValue) {
        if (d.staticValue.type !== d.type) throw new Error("TODO: static constants with different type from variable");
        ctx.module.dataSegment(addr, staticInitializer(d.staticValue));
    }

    ctx.nextStaticAddr += Math.ceil(d.type.bytes / 4) * 4; // 4 byte align
}

export function storageSetupScope(ctx: WFnGenerator, s: Scope): void {
    for (const declaration of s.declarations) {
        if (declaration instanceof CArgument) {
            setStorageLocation(declaration, {
                type: "local",
                index: ctx.builder.args[declaration.index]
            });
        }

        if (declaration instanceof CVariable) {
            if (declaration.storage === undefined) {
                setStorageLocation(declaration, {
                    type: "local",
                    index: ctx.builder.addLocal(realType(declaration.type))
                });
            } else if (declaration.storage === "static") {
                storageSetupStaticVar(ctx.gen, declaration);
            }
        }
    }
}

// the storage operations

/** Pushes the stored value from location 'e' onto the stack  */
export function storageGet(ctx: WFnGenerator, ctype: CType, locationExpr: CExpression): WExpression {
    const [instr, location] = fromExpression(ctx, locationExpr);

    if (location.type === "local") {
        instr.push(Instructions.local.get(location.index));
    } else if (location.type === "static") {
        instr.push(Instructions.i32.const(0), load(ctype, location.address));
    } else {
        instr.push(load(ctype, 0));
    }
    return instr;
}

/** Stores the value on the top of the stack when 'valueExpr' is run into location 'locationExpr'.
 * If keepValue is true then the stored value is kept on the top of the stack after being stored */
export function storageSet(ctx: WFnGenerator, ctype: CType, locationExpr: CExpression, valueExpr: CExpression, keepValue: boolean): WExpression {
    const [instr, location] = fromExpression(ctx, locationExpr);
    const valueInstr = ctx.expression(valueExpr, false);

    if (location.type === "local") {
        instr.push(...valueInstr, keepValue ? Instructions.local.tee(location.index) : Instructions.local.set(location.index));
    } else if (location.type === "static") {
        instr.push(Instructions.i32.const(0), ...valueInstr);
        if (keepValue) {
            instr.push(...ctx.withTemporaryLocal(realType(ctype), (tmp) => [
                Instructions.local.tee(tmp), // store copy of value
                store(ctype, location.address),
                Instructions.local.get(tmp)
            ]));
        } else {
            instr.push(store(ctype, location.address));
        }
    } else if (location.type === "pointer") {
        // address should already be on top of the stack
        instr.push(...valueInstr);
        if (keepValue) {
            instr.push(...ctx.withTemporaryLocal(realType(ctype), (tmp) => [
                Instructions.local.tee(tmp), // store copy of value
                store(ctype, 0),
                Instructions.local.get(tmp)
            ]));
        } else {
            instr.push(store(ctype, 0));
        }
    }
    return instr;
}

/** Updates the location 'locationExpr' by running 'instr' which should transform its value on the stack.
 * If keepValue is true then the stored value is kept on the top of the stack after being stored */
export function storageUpdate(ctx: WFnGenerator, ctype: CType, locationExpr: CExpression, transform: WExpression, keepValue: boolean): WExpression {
    const [instr, location] = fromExpression(ctx, locationExpr);

    if (location.type === "local") {
        instr.push(Instructions.local.get(location.index), ...transform);
        if (keepValue) instr.push(Instructions.local.tee(location.index));
        else instr.push(Instructions.local.set(location.index));

        return instr;
    } else if (location.type === "static") {
        instr.push(Instructions.i32.const(0), Instructions.i32.const(0), load(ctype, location.address), ...transform);

        if (keepValue) {
            instr.push(...ctx.withTemporaryLocal(realType(ctype), (tmp) => [
                Instructions.local.tee(tmp), // store copy of value
                store(ctype, location.address),
                Instructions.local.get(tmp)
            ]));
        } else {
            instr.push(store(ctype, location.address));
        }
    } else if (location.type === "pointer") {
        instr.push(...ctx.withTemporaryLocal(i32Type, (addrTmp) => [
            Instructions.local.tee(addrTmp), // duplicate pointer on top of stack
            Instructions.local.get(addrTmp)
        ]));
        instr.push(load(ctype, 0), ...transform);

        if (keepValue) {
            instr.push(...ctx.withTemporaryLocal(realType(ctype), (tmp) => [
                Instructions.local.tee(tmp), // store copy of value
                store(ctype, 0),
                Instructions.local.get(tmp)
            ]));
        } else {
            instr.push(store(ctype, 0));
        }
    }
    return instr;
}

/** Updates the location 'locationExpr' by running 'instr' which should transform its value on the stack.
 * Value before transform is left on the stack */
export function storageGetThenUpdate(ctx: WFnGenerator, ctype: CType, locationExpr: CExpression, transform: WExpression): WExpression {
    const [instr, location] = fromExpression(ctx, locationExpr);

    if (location.type === "local") {
        instr.push(Instructions.local.get(location.index));
        instr.push(Instructions.local.get(location.index), ...transform, Instructions.local.set(location.index));
    } else if (location.type === "static") {
        instr.push(Instructions.i32.const(0), Instructions.i32.const(0), load(ctype, location.address));
        instr.push(...ctx.withTemporaryLocal(realType(ctype), (tmp) => [
            Instructions.local.tee(tmp), // store copy of old value
            ...transform,
            store(ctype, location.address),
            Instructions.local.get(tmp)
        ]));
    } else if (location.type === "pointer") {
        instr.push(...ctx.withTemporaryLocal(i32Type, (addrTmp) => [
            Instructions.local.tee(addrTmp), // duplicate pointer on top of stack
            Instructions.local.get(addrTmp)
        ]));
        instr.push(load(ctype, 0));
        instr.push(...ctx.withTemporaryLocal(realType(ctype), (tmp) => [
            Instructions.local.tee(tmp), // store copy of old value
            store(ctype, 0),
            ...transform,
            Instructions.local.get(tmp)
        ]));
    }
    return instr;
}

// helper to get address of a storage location
export function getAddress(ctx: WFnGenerator, s: e.CExpression): WExpression {
    const [instr, loc] = fromExpression(ctx, s);
    if (loc.type === "local") {
        throw new Error("Cannot get address of a wasm local");
    } else if (loc.type === "static") {
        instr.push(Instructions.i32.const(loc.address));
    }
    return instr;
}

// helper to get the storage location from an expression

/**
 * Helper function which finds the storage location from a CExpression.
 *
 * The first return value are instructions to be executed before accessing the storage and
 * the second return value is the storage location itself.
 */
function fromExpression(ctx: WFnGenerator, s: e.CExpression): [WExpression, StorageLocation] {
    if (!s.lvalue) throw new Error("Only lvalue expressions can have storage locations");

    if (s instanceof e.CIdentifier) {
        const location = getStorageLocation(s.value);
        if (location) return [[], location];

    } else if (s instanceof e.CMemberAccess) {
        // TODO
    } else if (s instanceof e.CDereference) {
        return [ctx.expression(s.body, false), {type: "pointer"}];
    }
    throw new Error("TODO");
}

// helpers for storing storage location on variables using a Symbol

const locationSymbol = Symbol("storage location");
function setStorageLocation(s: CDeclaration, loc: StorageLocation) {
    (s as any as Record<typeof locationSymbol, StorageLocation>)[locationSymbol] = loc;
}

function getStorageLocation(s: CDeclaration): StorageLocation | undefined {
    return (s as any as Record<typeof locationSymbol, StorageLocation | undefined>)[locationSymbol];
}

// helpers returning the instructions to read/write a type from memory

function load(type: CType, offset: number): WInstruction {
    if (!(type instanceof CArithmetic)) throw new Error("TODO");

    if (type.type === "float") {
        if (type.bytes === 8) {
            return Instructions.f64.load(2, offset);
        } else {
            return Instructions.f32.load(2, offset);
        }

    } else if (type.bytes === 8) {
        return Instructions.i64.load(2, offset);

    } else if (type.bytes === 4) {
        return Instructions.i32.load(2, offset);

    } else if (type.type === "signed") {
        if (type.bytes === 2) {
            return Instructions.i32.load16_s(1, offset);
        } else {
            return Instructions.i32.load8_s(0, offset);
        }

    } else {
        if (type.bytes === 2) {
            return Instructions.i32.load16_u(1, offset);
        } else {
            return Instructions.i32.load8_u(0, offset);
        }
    }
}

function store(type: CType, offset: number): WInstruction {
    if (!(type instanceof CArithmetic)) throw new Error("TODO");

    if (type.type === "float") {
        if (type.bytes === 8) {
            return Instructions.f64.store(2, offset);
        } else {
            return Instructions.f32.store(2, offset);
        }

    } else if (type.bytes === 8) {
        return Instructions.i64.store(2, offset);
    } else if (type.bytes === 4) {
        return Instructions.i32.store(2, offset);
    } else if (type.bytes === 2) {
        return Instructions.i32.store16(1, offset);
    } else {
        return Instructions.i32.store8(0, offset);
    }
}
