import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
class TokenParser {
    constructor() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const wasmBuffer = fs.readFileSync(`${__dirname}/nepse.wasm`);
        // Instantiate the WebAssembly module
        const wasmModule = new WebAssembly.Module(wasmBuffer);
        const instance = new WebAssembly.Instance(wasmModule, {});
        // Grab the exported functions
        this.cdx = instance.exports.cdx;
        this.rdx = instance.exports.rdx;
        this.bdx = instance.exports.bdx;
        this.ndx = instance.exports.ndx;
        this.mdx = instance.exports.mdx;
    }
    parseTokenResponse(tokenResponse) {
        const { salt1, salt2, salt3, salt4, salt5, accessToken, refreshToken } = tokenResponse;
        const n = this.cdx(salt1, salt2, salt3, salt4, salt5);
        const l = this.rdx(salt1, salt2, salt4, salt3, salt5);
        const o = this.bdx(salt1, salt2, salt4, salt3, salt5);
        const p = this.ndx(salt1, salt2, salt4, salt3, salt5);
        const q = this.mdx(salt1, salt2, salt4, salt3, salt5);
        const i = this.cdx(salt2, salt1, salt3, salt5, salt4);
        const r = this.rdx(salt2, salt1, salt3, salt4, salt5);
        const s = this.bdx(salt2, salt1, salt4, salt3, salt5);
        const t = this.ndx(salt2, salt1, salt4, salt3, salt5);
        const u = this.mdx(salt2, salt1, salt4, salt3, salt5);
        const parsedAccessToken = accessToken.slice(0, n) +
            accessToken.slice(n + 1, l) +
            accessToken.slice(l + 1, o) +
            accessToken.slice(o + 1, p) +
            accessToken.slice(p + 1, q) +
            accessToken.slice(q + 1);
        const parsedRefreshToken = refreshToken.slice(0, i) +
            refreshToken.slice(i + 1, r) +
            refreshToken.slice(r + 1, s) +
            refreshToken.slice(s + 1, t) +
            refreshToken.slice(t + 1, u) +
            refreshToken.slice(u + 1);
        return [parsedAccessToken, parsedRefreshToken];
    }
}
export default TokenParser;
//# sourceMappingURL=TokenParser.js.map