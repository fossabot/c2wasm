import {compile} from "../src/generation";
import wabt from "wabt";

const testInput = `
long factorial(unsigned int v) {
  return v < 2 ? 1 : v * factorial(v - 1);
}
`.trimStart();

wabt().then(wabt => {
    function cToWat(input: string) {
        try {
            const module = compile(input);
            const compiled = module.toBytes();

            const wabtModule = wabt.readWasm(compiled, {
                mutable_globals: true,
                sat_float_to_int: true,
                sign_extension: true,
                bulk_memory: true
            });

            const text = wabtModule.toText({
                inlineExport: true
            });

            let validationError = "";
            try {
                wabtModule.validate();
            } catch (e) {
                console.debug(e);
                validationError = e.toString() + "\n\n\n";
            }

            return validationError + text;
        } catch (e) {
            console.debug(e);
            return e.stack;
        }
    }

    if (typeof window !== 'undefined' && window.document) {
        window.document.write(`
        <h1>c2wasm</h1>
        <div>
            <textarea id="textInput" rows="20" style="width: 100%">${testInput}</textarea>
            <pre id="output">${cToWat(testInput)}</pre>
        </div>
    `);

        const textInput = window.document.getElementById("textInput") as HTMLTextAreaElement;
        const output = window.document.getElementById("output") as HTMLPreElement;

        const handler = () => {
            output.textContent = cToWat(textInput.value);
        };
        textInput.addEventListener("input", handler);
    } else {
        console.log(cToWat(testInput));
    }

});
