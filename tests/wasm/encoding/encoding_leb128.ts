import test from "ava";
import {unsignedLeb128, signedLeb128} from "../../../src/wasm/encoding";

test('unsigned leb128 encoding', t => {
    for (const [value, result] of _unsigned_testcases) {
        t.deepEqual(unsignedLeb128(value), result);
    }
});

test("signed leb128 encoding", t => {
    for (const [value, result] of _signed_testcases) {
        t.deepEqual(signedLeb128(value), result);
    }
});

const _unsigned_testcases: [bigint, number[]][] = [
    [0n, [0]],
    [1n, [1]],
    [2n, [2]],
    [3n, [3]],
    [4n, [4]],
    [7n, [7]],
    [8n, [8]],
    [14n, [14]],
    [15n, [15]],
    [16n, [16]],
    [25n, [25]],
    [30n, [30]],
    [31n, [31]],
    [32n, [32]],
    [63n, [63]],
    [64n, [64]],
    [77n, [77]],
    [127n, [127]],
    [128n, [128,1]],
    [128n, [128,1]],
    [166n, [166,1]],
    [209n, [209,1]],
    [211n, [211,1]],
    [255n, [255,1]],
    [256n, [128,2]],
    [434n, [178,3]],
    [511n, [255,3]],
    [512n, [128,4]],
    [600n, [216,4]],
    [799n, [159,6]],
    [831n, [191,6]],
    [891n, [251,6]],
    [1023n, [255,7]],
    [1024n, [128,8]],
    [1045n, [149,8]],
    [1365n, [213,10]],
    [1419n, [139,11]],
    [1441n, [161,11]],
    [1885n, [221,14]],
    [2047n, [255,15]],
    [2048n, [128,16]],
    [3191n, [247,24]],
    [4095n, [255,31]],
    [4096n, [128,32]],
    [4872n, [136,38]],
    [7184n, [144,56]],
    [8191n, [255,63]],
    [8192n, [128,64]],
    [13450n, [138,105]],
    [13608n, [168,106]],
    [16383n, [255,127]],
    [16384n, [128,128,1]],
    [21242n, [250,165,1]],
    [28083n, [179,219,1]],
    [29306n, [250,228,1]],
    [32767n, [255,255,1]],
    [32768n, [128,128,2]],
    [39093n, [181,177,2]],
    [62856n, [136,235,3]],
    [64512n, [128,248,3]],
    [65535n, [255,255,3]],
    [65536n, [128,128,4]],
    [109154n, [226,212,6]],
    [115474n, [146,134,7]],
    [121192n, [232,178,7]],
    [122539n, [171,189,7]],
    [123303n, [167,195,7]],
    [131071n, [255,255,7]],
    [131072n, [128,128,8]],
    [177117n, [221,231,10]],
    [262143n, [255,255,15]],
    [262144n, [128,128,16]],
    [282907n, [155,162,17]],
    [302882n, [162,190,18]],
    [308547n, [195,234,18]],
    [393413n, [197,129,24]],
    [524287n, [255,255,31]],
    [524288n, [128,128,32]],
    [581337n, [217,189,35]],
    [746257n, [145,198,45]],
    [941263n, [207,185,57]],
    [968743n, [167,144,59]],
    [1048575n, [255,255,63]],
    [1048576n, [128,128,64]],
    [1454560n, [224,227,88]],
    [1881586n, [242,235,114]],
    [2097151n, [255,255,127]],
    [2097152n, [128,128,128,1]],
    [2490536n, [168,129,152,1]],
    [3136077n, [205,180,191,1]],
    [3232629n, [245,166,197,1]],
    [4187878n, [230,205,255,1]],
    [4194303n, [255,255,255,1]],
    [4194304n, [128,128,128,2]],
    [5281362n, [210,172,194,2]],
    [8388607n, [255,255,255,3]],
    [8388608n, [128,128,128,4]],
    [9407013n, [165,148,190,4]],
    [12148535n, [183,190,229,5]],
    [15480337n, [145,236,176,7]],
    [15563913n, [137,249,181,7]],
    [16777215n, [255,255,255,7]],
    [16777216n, [128,128,128,8]],
    [22113553n, [145,218,197,10]],
    [29809724n, [188,184,155,14]],
    [30372353n, [129,228,189,14]],
    [33554431n, [255,255,255,15]],
    [33554432n, [128,128,128,16]],
    [40427347n, [211,190,163,19]],
    [49745571n, [163,157,220,23]],
    [67108863n, [255,255,255,31]],
    [67108864n, [128,128,128,32]],
    [85879973n, [165,217,249,40]],
    [101063644n, [220,183,152,48]],
    [101274367n, [255,165,165,48]],
    [134217727n, [255,255,255,63]],
    [134217728n, [128,128,128,64]],
    [204687592n, [232,145,205,97]],
    [211692755n, [211,217,248,100]],
    [255131443n, [179,254,211,121]],
    [264075322n, [186,240,245,125]],
    [265100043n, [139,182,180,126]],
    [268435455n, [255,255,255,127]],
    [268435456n, [128,128,128,128,1]],
    [323549737n, [169,244,163,154,1]],
    [385123827n, [243,139,210,183,1]],
    [469270682n, [154,129,226,223,1]],
    [536870911n, [255,255,255,255,1]],
    [536870912n, [128,128,128,128,2]],
    [868558529n, [193,205,148,158,3]],
    [929439869n, [253,192,152,187,3]],
    [1014304398n, [142,157,212,227,3]],
    [1073741823n, [255,255,255,255,3]],
    [1073741824n, [128,128,128,128,4]],
    [1308347370n, [234,151,239,239,4]],
    [1821849354n, [138,238,220,228,6]],
    [2124496862n, [222,255,132,245,7]],
    [2147483647n, [255,255,255,255,7]],
    [2147483648n, [128,128,128,128,8]],
    [2831023613n, [253,251,247,197,10]],
    [3915550100n, [148,155,138,203,14]],
    [4294967295n, [255,255,255,255,15]],
    [4294967296n, [128,128,128,128,16]],
    [4725896856n, [152,237,189,205,17]],
    [6516979018n, [202,234,196,163,24]],
    [8589934591n, [255,255,255,255,31]],
    [8589934592n, [128,128,128,128,32]],
    [10233814478n, [206,187,238,143,38]],
    [15372116599n, [247,196,255,161,57]],
    [17044276273n, [177,136,172,191,63]],
    [17179869183n, [255,255,255,255,63]],
    [17179869184n, [128,128,128,128,64]],
    [18836651079n, [199,248,129,150,70]],
    [31666962413n, [237,255,253,251,117]],
    [31768470757n, [229,201,177,172,118]],
    [33436222881n, [161,139,209,199,124]],
    [34359738367n, [255,255,255,255,127]],
    [34359738368n, [128,128,128,128,128,1]],
    [36571953534n, [254,242,238,158,136,1]],
    [57164493928n, [232,232,147,250,212,1]],
    [60236760131n, [195,136,144,179,224,1]],
    [68719476735n, [255,255,255,255,255,1]],
    [68719476736n, [128,128,128,128,128,2]],
    [82562123901n, [253,144,216,200,179,2]],
    [88548239972n, [228,212,139,239,201,2]],
    [111721690751n, [255,236,134,153,160,3]],
    [124500827715n, [195,188,207,230,207,3]],
    [137438953471n, [255,255,255,255,255,3]],
    [137438953472n, [128,128,128,128,128,4]],
    [190275670773n, [245,165,193,234,196,5]],
    [217887939485n, [157,183,136,217,171,6]],
    [257008165573n, [197,197,133,183,189,7]],
    [274877906943n, [255,255,255,255,255,7]],
    [274877906944n, [128,128,128,128,128,8]],
    [339493523298n, [226,158,144,219,240,9]],
    [519125036588n, [172,220,141,242,141,15]],
    [549755813887n, [255,255,255,255,255,15]],
    [549755813888n, [128,128,128,128,128,16]],
    [575738895517n, [157,185,217,229,224,16]],
    [676933784180n, [244,164,151,227,217,19]],
    [689605909238n, [246,181,220,253,136,20]],
    [962747718426n, [154,182,241,193,130,28]],
    [995760000964n, [196,159,175,191,253,28]],
    [1099511627775n, [255,255,255,255,255,31]],
    [1099511627776n, [128,128,128,128,128,32]],
    [2005697890472n, [168,145,164,231,175,58]],
    [2199023255551n, [255,255,255,255,255,63]],
    [2199023255552n, [128,128,128,128,128,64]],
    [2636275119259n, [155,233,247,241,220,76]],
    [3681862758009n, [249,220,252,128,148,107]],
    [3729780033299n, [147,142,219,193,198,108]],
    [4035546278511n, [239,212,181,202,185,117]],
    [4398046511103n, [255,255,255,255,255,127]],
    [4398046511104n, [128,128,128,128,128,128,1]],
    [4458255940195n, [227,244,139,166,224,129,1]],
    [5987489047877n, [197,202,161,145,161,174,1]],
    [8796093022207n, [255,255,255,255,255,255,1]],
    [8796093022208n, [128,128,128,128,128,128,2]],
    [10663455940337n, [241,189,131,188,172,182,2]],
    [14129304277517n, [141,164,166,225,155,155,3]],
    [14353534778763n, [139,251,221,138,223,161,3]],
    [15993822770209n, [161,232,255,208,189,209,3]],
    [17592186044415n, [255,255,255,255,255,255,3]],
    [17592186044416n, [128,128,128,128,128,128,4]],
    [18568314053288n, [168,197,141,174,180,156,4]],
    [21106410720757n, [245,155,244,192,163,230,4]],
    [30645653860878n, [142,228,191,250,243,251,6]],
    [33616598549721n, [217,137,169,203,175,210,7]],
    [35184372088831n, [255,255,255,255,255,255,7]],
    [35184372088832n, [128,128,128,128,128,128,8]],
    [55784347355886n, [238,149,213,241,196,215,12]],
    [70368744177663n, [255,255,255,255,255,255,15]],
    [70368744177664n, [128,128,128,128,128,128,16]],
    [81771198254753n, [161,157,230,185,237,203,18]],
    [131432903073423n, [143,189,255,219,153,241,29]],
    [140737488355327n, [255,255,255,255,255,255,31]],
    [140737488355328n, [128,128,128,128,128,128,32]],
    [142831590087731n, [179,184,194,145,249,188,32]],
    [217776919768919n, [215,222,197,159,146,194,49]],
    [276912834093537n, [225,195,240,216,156,251,62]],
    [278310692677450n, [202,206,229,143,244,163,63]],
    [281474976710655n, [255,255,255,255,255,255,63]],
    [281474976710656n, [128,128,128,128,128,128,64]],
    [400009103745034n, [138,192,164,132,230,249,90]],
    [449289554914298n, [250,215,201,130,134,148,102]],
    [562949953421311n, [255,255,255,255,255,255,127]],
    [562949953421312n, [128,128,128,128,128,128,128,1]],
    [571631013811347n, [147,169,149,188,211,252,129,1]],
    [628134084980771n, [163,224,134,232,141,233,142,1]],
    [717644883237677n, [173,182,220,194,155,150,163,1]],
    [987640209280374n, [246,154,220,190,142,200,224,1]],
    [1007142054952897n, [193,255,177,195,216,255,228,1]],
    [1016994251863159n, [247,232,251,232,182,158,231,1]],
    [1125899906842623n, [255,255,255,255,255,255,255,1]],
    [1125899906842624n, [128,128,128,128,128,128,128,2]],
    [2015169811057077n, [181,147,128,198,148,153,202,3]],
    [2077673654081861n, [197,178,241,192,161,180,216,3]],
    [2251799813685247n, [255,255,255,255,255,255,255,3]],
    [2251799813685248n, [128,128,128,128,128,128,128,4]],
    [3041592090871919n, [239,144,131,193,253,201,179,5]],
    [3064331655845685n, [181,174,200,254,228,223,184,5]],
    [4503599627370495n, [255,255,255,255,255,255,255,7]],
    [4503599627370496n, [128,128,128,128,128,128,128,8]],
    [7472014828422556n, [156,139,235,172,160,248,162,13]],
    [8294814475740223n, [191,200,183,242,239,130,222,14]],
    [9007199254740991n, [255,255,255,255,255,255,255,15]],
    [9007199254740992n, [128,128,128,128,128,128,128,16]],
    [9833635199446560n, [160,220,167,231,185,244,187,17]],
    [12527122023968891n, [251,224,175,146,158,171,160,22]],
    [14816670745519759n, [143,205,169,228,239,245,168,26]],
    [18014398509481983n, [255,255,255,255,255,255,255,31]],
    [18014398509481984n, [128,128,128,128,128,128,128,32]],
    [18881045900255935n, [191,197,253,142,225,134,197,33]],
    [32234212774399064n, [216,152,161,144,136,155,161,57]],
    [36028797018963967n, [255,255,255,255,255,255,255,63]],
    [36028797018963968n, [128,128,128,128,128,128,128,64]],
    [48881974337753579n, [235,163,201,226,216,188,234,86]],
    [63565097190228811n, [203,134,140,241,231,131,245,112]],
    [70111544949766230n, [214,240,137,155,194,194,197,124]],
    [71896727691320312n, [248,183,183,148,150,182,219,127]],
    [72057594037927935n, [255,255,255,255,255,255,255,127]],
    [72057594037927936n, [128,128,128,128,128,128,128,128,1]],
    [90721491583358468n, [132,172,199,186,244,214,147,161,1]],
    [104183766568051358n, [158,197,154,237,214,210,136,185,1]],
    [129632127386461007n, [207,198,228,194,186,247,162,230,1]],
    [144115188075855871n, [255,255,255,255,255,255,255,255,1]],
    [144115188075855872n, [128,128,128,128,128,128,128,128,2]],
    [181331969680673497n, [217,149,244,185,243,142,142,194,2]],
    [194554733717127985n, [177,134,210,132,254,207,204,217,2]],
    [197676685565653507n, [131,228,145,252,222,188,146,223,2]],
    [236303665413362187n, [139,164,216,160,232,157,225,163,3]],
    [247481225903637459n, [211,135,194,244,209,219,206,183,3]],
    [288230376151711743n, [255,255,255,255,255,255,255,255,3]],
    [288230376151711744n, [128,128,128,128,128,128,128,128,4]],
    [398369533643317296n, [176,192,151,241,174,223,210,195,5]],
    [489737979447726454n, [246,162,255,207,143,195,249,229,6]],
    [576460752303423487n, [255,255,255,255,255,255,255,255,7]],
    [576460752303423488n, [128,128,128,128,128,128,128,128,8]],
    [731003428351541305n, [185,128,242,227,235,247,194,146,10]],
    [812840250704218051n, [195,143,245,146,236,188,242,163,11]],
    [1083594685606991316n, [212,171,236,224,129,244,236,132,15]],
    [1152921504606846975n, [255,255,255,255,255,255,255,255,15]],
    [1152921504606846976n, [128,128,128,128,128,128,128,128,16]],
    [1566089853787192770n, [194,251,208,234,202,205,247,221,21]],
    [1628160053503330817n, [129,148,176,212,147,222,152,204,22]],
    [2305843009213693951n, [255,255,255,255,255,255,255,255,31]],
    [2305843009213693952n, [128,128,128,128,128,128,128,128,32]],
    [2593514563045453311n, [255,219,129,209,144,248,128,255,35]],
    [3427937370897963695n, [175,181,163,197,135,220,158,201,47]],
    [4474743851124760969n, [137,195,158,217,176,250,222,140,62]],
    [4611686018427387903n, [255,255,255,255,255,255,255,255,63]],
    [4611686018427387904n, [128,128,128,128,128,128,128,128,64]],
    [5767697194182539983n, [207,245,145,250,161,193,190,133,80]],
    [9223372036854775807n, [255,255,255,255,255,255,255,255,127]],
    [9223372036854775808n, [128,128,128,128,128,128,128,128,128,1]],
    [18446744073709551615n, [255,255,255,255,255,255,255,255,255,1]]
];

const _signed_testcases: [bigint, number[]][] = [
    [-9223372036854775808n, [128,128,128,128,128,128,128,128,128,127]],
    [-7144954229416795190n, [202,199,191,153,190,191,129,236,156,127]],
    [-4611686018427387904n, [128,128,128,128,128,128,128,128,64]],
    [-4089427873693088999n, [153,134,197,239,191,224,219,159,71]],
    [-3367021148757365941n, [203,214,219,232,171,131,252,162,81]],
    [-2305843009213693952n, [128,128,128,128,128,128,128,128,96]],
    [-1152921504606846976n, [128,128,128,128,128,128,128,128,112]],
    [-848406888430342597n, [187,220,245,176,225,205,246,156,116]],
    [-576460752303423488n, [128,128,128,128,128,128,128,128,120]],
    [-445943518170273124n, [156,213,202,140,186,151,236,231,121]],
    [-288230376151711744n, [128,128,128,128,128,128,128,128,124]],
    [-238967281135591324n, [228,192,227,247,225,144,193,215,124]],
    [-155719695639904074n, [182,129,232,198,176,184,177,235,125]],
    [-144115188075855872n, [128,128,128,128,128,128,128,128,126]],
    [-80768640655180537n, [135,250,134,198,150,171,195,240,126]],
    [-72057594037927936n, [128,128,128,128,128,128,128,128,127]],
    [-68503078464740205n, [147,201,218,176,130,154,168,134,127]],
    [-61307147442908734n, [194,163,228,179,150,175,140,147,127]],
    [-36028797018963968n, [128,128,128,128,128,128,128,64]],
    [-34234672122055175n, [249,235,166,137,244,247,151,67]],
    [-18014398509481984n, [128,128,128,128,128,128,128,96]],
    [-17267430571975029n, [139,189,203,180,208,235,169,97]],
    [-9007199254740992n, [128,128,128,128,128,128,128,112]],
    [-7940253659815278n, [146,197,184,137,154,204,242,113]],
    [-7820915778703776n, [224,220,196,169,178,221,141,114]],
    [-6729360135994462n, [162,135,157,252,235,245,133,116]],
    [-6659799062005418n, [214,242,136,149,171,222,149,116]],
    [-4503599627370496n, [128,128,128,128,128,128,128,120]],
    [-3332948687380018n, [206,195,188,203,182,150,138,122]],
    [-2635780135684631n, [233,235,185,234,217,216,168,123]],
    [-2251799813685248n, [128,128,128,128,128,128,128,124]],
    [-2084132838401494n, [170,180,130,148,224,143,166,124]],
    [-1125899906842624n, [128,128,128,128,128,128,128,126]],
    [-562949953421312n, [128,128,128,128,128,128,128,127]],
    [-315240203959790n, [146,132,255,220,166,169,184,127]],
    [-281474976710656n, [128,128,128,128,128,128,64]],
    [-166701739459909n, [187,245,164,208,171,140,90]],
    [-140737488355328n, [128,128,128,128,128,128,96]],
    [-120159145221393n, [239,197,212,166,244,214,100]],
    [-70368744177664n, [128,128,128,128,128,128,112]],
    [-69520120817610n, [182,176,147,175,217,152,112]],
    [-68738743826430n, [130,144,222,156,184,175,112]],
    [-67074793032089n, [231,236,166,246,238,223,112]],
    [-59267227877434n, [198,255,189,175,140,195,114]],
    [-35184372088832n, [128,128,128,128,128,128,120]],
    [-17592186044416n, [128,128,128,128,128,128,124]],
    [-8796093022208n, [128,128,128,128,128,128,126]],
    [-6929397435811n, [221,228,232,253,169,182,126]],
    [-6152155848531n, [173,193,190,183,249,204,126]],
    [-4398046511104n, [128,128,128,128,128,128,127]],
    [-3368235975232n, [192,251,246,171,252,157,127]],
    [-2199023255552n, [128,128,128,128,128,64]],
    [-1377305700451n, [157,175,187,145,245,87]],
    [-1099511627776n, [128,128,128,128,128,96]],
    [-549755813888n, [128,128,128,128,128,112]],
    [-506708723251n, [205,243,185,174,160,113]],
    [-274877906944n, [128,128,128,128,128,120]],
    [-259975887746n, [254,136,235,193,183,120]],
    [-244558745575n, [153,224,166,249,240,120]],
    [-223061443769n, [199,246,129,132,193,121]],
    [-137438953472n, [128,128,128,128,128,124]],
    [-115297389916n, [164,229,245,189,210,124]],
    [-68719476736n, [128,128,128,128,128,126]],
    [-67544254538n, [182,239,177,176,132,126]],
    [-34359738368n, [128,128,128,128,128,127]],
    [-33481984093n, [163,239,197,162,131,127]],
    [-17179869184n, [128,128,128,128,64]],
    [-8589934592n, [128,128,128,128,96]],
    [-5246136940n, [148,155,185,186,108]],
    [-4294967296n, [128,128,128,128,112]],
    [-2147483648n, [128,128,128,128,120]],
    [-1740699417n, [231,145,252,193,121]],
    [-1678117422n, [210,235,231,223,121]],
    [-1449400156n, [164,209,239,204,122]],
    [-1073741824n, [128,128,128,128,124]],
    [-930156599n, [201,223,187,196,124]],
    [-536870912n, [128,128,128,128,126]],
    [-494255927n, [201,129,169,148,126]],
    [-357421813n, [139,218,200,213,126]],
    [-268435456n, [128,128,128,128,127]],
    [-134217728n, [128,128,128,64]],
    [-67108864n, [128,128,128,96]],
    [-43869432n, [136,182,138,107]],
    [-33554432n, [128,128,128,112]],
    [-19309207n, [233,186,229,118]],
    [-16777216n, [128,128,128,120]],
    [-15638472n, [184,192,197,120]],
    [-8388608n, [128,128,128,124]],
    [-7027027n, [173,141,211,124]],
    [-4194304n, [128,128,128,126]],
    [-3123791n, [177,171,193,126]],
    [-2305817n, [231,161,243,126]],
    [-2102903n, [137,211,255,126]],
    [-2097152n, [128,128,128,127]],
    [-1628258n, [158,207,156,127]],
    [-1048576n, [128,128,64]],
    [-923223n, [169,211,71]],
    [-730883n, [253,177,83]],
    [-524288n, [128,128,96]],
    [-501696n, [192,176,97]],
    [-461477n, [219,234,99]],
    [-262144n, [128,128,112]],
    [-218693n, [187,211,114]],
    [-131072n, [128,128,120]],
    [-125452n, [244,171,120]],
    [-118540n, [244,225,120]],
    [-116316n, [164,243,120]],
    [-101053n, [195,234,121]],
    [-86906n, [134,217,122]],
    [-65536n, [128,128,124]],
    [-43118n, [146,175,125]],
    [-32768n, [128,128,126]],
    [-23271n, [153,202,126]],
    [-19154n, [174,234,126]],
    [-16384n, [128,128,127]],
    [-10149n, [219,176,127]],
    [-8192n, [128,64]],
    [-6139n, [133,80]],
    [-4096n, [128,96]],
    [-3706n, [134,99]],
    [-2492n, [196,108]],
    [-2168n, [136,111]],
    [-2048n, [128,112]],
    [-1614n, [178,115]],
    [-1024n, [128,120]],
    [-968n, [184,120]],
    [-512n, [128,124]],
    [-492n, [148,124]],
    [-256n, [128,126]],
    [-162n, [222,126]],
    [-128n, [128,127]],
    [-120n, [136,127]],
    [-69n, [187,127]],
    [-64n, [64]],
    [-48n, [80]],
    [-47n, [81]],
    [-45n, [83]],
    [-33n, [95]],
    [-32n, [96]],
    [-32n, [96]],
    [-16n, [112]],
    [-8n, [120]],
    [-7n, [121]],
    [-4n, [124]],
    [-2n, [126]],
    [0n, [0]],
    [1n, [1]],
    [3n, [3]],
    [7n, [7]],
    [15n, [15]],
    [31n, [31]],
    [51n, [51]],
    [63n, [63]],
    [127n, [255,0]],
    [142n, [142,1]],
    [189n, [189,1]],
    [255n, [255,1]],
    [511n, [255,3]],
    [847n, [207,6]],
    [883n, [243,6]],
    [1023n, [255,7]],
    [1402n, [250,10]],
    [1808n, [144,14]],
    [2047n, [255,15]],
    [2196n, [148,17]],
    [2340n, [164,18]],
    [2384n, [208,18]],
    [4095n, [255,31]],
    [6631n, [231,51]],
    [8191n, [255,63]],
    [11908n, [132,221,0]],
    [16383n, [255,255,0]],
    [24523n, [203,191,1]],
    [32767n, [255,255,1]],
    [34165n, [245,138,2]],
    [65535n, [255,255,3]],
    [82574n, [142,133,5]],
    [96212n, [212,239,5]],
    [131071n, [255,255,7]],
    [262143n, [255,255,15]],
    [524287n, [255,255,31]],
    [955554n, [162,169,58]],
    [1048575n, [255,255,63]],
    [1906446n, [142,174,244,0]],
    [2097151n, [255,255,255,0]],
    [4194303n, [255,255,255,1]],
    [7998667n, [203,153,232,3]],
    [8268141n, [237,210,248,3]],
    [8388607n, [255,255,255,3]],
    [14770438n, [134,194,133,7]],
    [14805308n, [188,210,135,7]],
    [15874449n, [145,243,200,7]],
    [16777215n, [255,255,255,7]],
    [17267478n, [150,246,157,8]],
    [21871694n, [206,248,182,10]],
    [23664229n, [229,172,164,11]],
    [32581531n, [155,207,196,15]],
    [32896067n, [195,232,215,15]],
    [33554431n, [255,255,255,15]],
    [35106034n, [242,217,222,16]],
    [67108863n, [255,255,255,31]],
    [105435229n, [221,160,163,50]],
    [108037608n, [232,139,194,51]],
    [118707002n, [186,166,205,56]],
    [119194167n, [183,132,235,56]],
    [134217727n, [255,255,255,63]],
    [258006456n, [184,187,131,251,0]],
    [268435455n, [255,255,255,255,0]],
    [454987004n, [252,153,250,216,1]],
    [536870911n, [255,255,255,255,1]],
    [633953272n, [248,183,165,174,2]],
    [854910834n, [242,206,211,151,3]],
    [1073741823n, [255,255,255,255,3]],
    [2147483647n, [255,255,255,255,7]],
    [2841181116n, [188,247,227,202,10]],
    [3963978023n, [167,130,150,226,14]],
    [4124701168n, [240,227,231,174,15]],
    [4294967295n, [255,255,255,255,15]],
    [4818442013n, [157,174,206,249,17]],
    [6742498845n, [157,188,137,143,25]],
    [8490815555n, [195,160,222,208,31]],
    [8589934591n, [255,255,255,255,31]],
    [11881244755n, [211,208,181,161,44]],
    [17179869183n, [255,255,255,255,63]],
    [19569317213n, [221,170,176,243,200,0]],
    [33141343880n, [136,141,131,187,251,0]],
    [34359738367n, [255,255,255,255,255,0]],
    [66668978368n, [192,193,159,174,248,1]],
    [68719476735n, [255,255,255,255,255,1]],
    [92816896681n, [169,229,197,226,217,2]],
    [97128438157n, [141,179,185,234,233,2]],
    [137438953471n, [255,255,255,255,255,3]],
    [148813532240n, [208,152,233,175,170,4]],
    [182832618853n, [229,186,177,141,169,5]],
    [221324529813n, [149,161,225,191,184,6]],
    [249218601474n, [130,164,216,180,160,7]],
    [274877906943n, [255,255,255,255,255,7]],
    [549755813887n, [255,255,255,255,255,15]],
    [652652420644n, [164,188,246,168,255,18]],
    [670476891761n, [241,236,165,220,193,19]],
    [1099511627775n, [255,255,255,255,255,31]],
    [1270593666676n, [244,252,162,170,253,36]],
    [1503378051303n, [231,161,194,194,224,43]],
    [2056843405207n, [151,207,174,171,238,59]],
    [2199023255551n, [255,255,255,255,255,63]],
    [2786377386374n, [134,147,163,136,140,209,0]],
    [3308940375136n, [224,232,220,225,166,224,0]],
    [3424537288604n, [156,191,208,178,213,227,0]],
    [3679890642002n, [210,168,204,212,140,235,0]],
    [4398046511103n, [255,255,255,255,255,255,0]],
    [8203200276489n, [137,208,218,166,223,238,1]],
    [8796093022207n, [255,255,255,255,255,255,1]],
    [17592186044415n, [255,255,255,255,255,255,3]],
    [31906835044614n, [134,178,198,156,206,160,7]],
    [35184372088831n, [255,255,255,255,255,255,7]],
    [51347105229945n, [249,216,222,239,178,214,11]],
    [61958315715319n, [247,213,152,219,156,139,14]],
    [70368744177663n, [255,255,255,255,255,255,15]],
    [83071776527138n, [162,166,236,189,218,241,18]],
    [140737488355327n, [255,255,255,255,255,255,31]],
    [202138998835917n, [205,149,226,185,130,251,45]],
    [244681786499989n, [149,199,222,215,150,209,55]],
    [262298859949354n, [170,154,253,178,243,209,59]],
    [281474976710655n, [255,255,255,255,255,255,63]],
    [359364225841318n, [166,241,154,136,240,218,209,0]],
    [486030386935404n, [236,236,192,164,172,193,238,0]],
    [545904728667786n, [138,237,187,203,245,143,252,0]],
    [562949953421311n, [255,255,255,255,255,255,255,0]],
    [824158526957339n, [155,206,243,225,149,178,187,1]],
    [1109649488850236n, [188,218,238,188,134,167,252,1]],
    [1125899906842623n, [255,255,255,255,255,255,255,1]],
    [2251799813685247n, [255,255,255,255,255,255,255,3]],
    [2284887599363378n, [178,234,216,205,253,194,135,4]],
    [3561198103897201n, [241,200,212,223,192,220,169,6]],
    [4503599627370495n, [255,255,255,255,255,255,255,7]],
    [9007199254740991n, [255,255,255,255,255,255,255,15]],
    [9075787003300883n, [147,152,142,163,149,204,143,16]],
    [12950559332202827n, [203,242,141,133,241,206,128,23]],
    [16901760935391307n, [203,224,135,133,254,129,131,30]],
    [18014398509481983n, [255,255,255,255,255,255,255,31]],
    [36028797018963967n, [255,255,255,255,255,255,255,63]],
    [72057594037927935n, [255,255,255,255,255,255,255,255,0]],
    [80431421108769874n, [210,168,223,223,184,254,239,142,1]],
    [95784055915419563n, [171,175,240,159,246,226,146,170,1]],
    [105669922738371160n, [216,244,141,130,194,199,218,187,1]],
    [144115188075855871n, [255,255,255,255,255,255,255,255,1]],
    [166958101514010428n, [188,254,246,232,163,240,201,168,2]],
    [224310982849066240n, [128,234,191,159,232,180,186,142,3]],
    [269532843863875216n, [144,189,186,174,152,214,228,222,3]],
    [288230376151711743n, [255,255,255,255,255,255,255,255,3]],
    [363305500170992742n, [230,248,140,149,215,141,174,133,5]],
    [576460752303423487n, [255,255,255,255,255,255,255,255,7]],
    [726620324443709606n, [166,193,175,168,221,170,222,138,10]],
    [769419481723224315n, [251,129,131,219,146,222,225,214,10]],
    [889150857747708065n, [161,241,164,158,232,191,185,171,12]],
    [1152921504606846975n, [255,255,255,255,255,255,255,255,15]],
    [1365309770436235295n, [159,160,227,153,138,192,163,249,18]],
    [2305843009213693951n, [255,255,255,255,255,255,255,255,31]],
    [4611686018427387903n, [255,255,255,255,255,255,255,255,63]],
    [6020016793443520991n, [223,163,217,152,141,172,217,197,211,0]],
    [9223372036854775807n, [255,255,255,255,255,255,255,255,255,0]]
];
