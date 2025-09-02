import fs from "fs"
import { dirname } from "path";
import { fileURLToPath } from "url";

class TokenParser {
  private cdx: Function;
  private rdx: Function;
  private bdx: Function;
  private ndx: Function;
  private mdx: Function;

  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const wasmBuffer = fs.readFileSync(`${__dirname}/nepse.wasm`);

    // Instantiate the WebAssembly module
    const wasmModule = new WebAssembly.Module(wasmBuffer);
    const instance = new WebAssembly.Instance(wasmModule, {});

    // Grab the exported functions
    this.cdx = instance.exports.cdx as Function;
    this.rdx = instance.exports.rdx as Function;
    this.bdx = instance.exports.bdx as Function;
    this.ndx = instance.exports.ndx as Function;
    this.mdx = instance.exports.mdx as Function;
  }

  parseTokenResponse(tokenResponse: {
    salt1: number;
    salt2: number;
    salt3: number;
    salt4: number;
    salt5: number;
    accessToken: string;
    refreshToken: string;
  }): [string, string] {

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


    const parsedAccessToken =
      accessToken.slice(0, n) +
      accessToken.slice(n + 1, l) +
      accessToken.slice(l + 1, o) +
      accessToken.slice(o + 1, p) +
      accessToken.slice(p + 1, q) +
      accessToken.slice(q + 1);

    const parsedRefreshToken =
      refreshToken.slice(0, i) +
      refreshToken.slice(i + 1, r) +
      refreshToken.slice(r + 1, s) +
      refreshToken.slice(s + 1, t) +
      refreshToken.slice(t + 1, u) +
      refreshToken.slice(u + 1);

    return [parsedAccessToken, parsedRefreshToken];
  }
}

export default TokenParser;