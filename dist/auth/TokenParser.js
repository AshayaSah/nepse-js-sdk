export class TokenParser {
    exports;
    constructor(exports) {
        this.exports = exports;
    }
    parseTokenResponse(tokenResponse) {
        const { salt1, salt2, salt3, salt4, salt5, accessToken, refreshToken } = tokenResponse;
        const n = this.exports.cdx(salt1, salt2, salt3, salt4, salt5);
        const l = this.exports.rdx(salt1, salt2, salt4, salt3, salt5);
        const o = this.exports.bdx(salt1, salt2, salt4, salt3, salt5);
        const p = this.exports.ndx(salt1, salt2, salt4, salt3, salt5);
        const q = this.exports.mdx(salt1, salt2, salt4, salt3, salt5);
        const i = this.exports.cdx(salt2, salt1, salt3, salt5, salt4);
        const r = this.exports.rdx(salt2, salt1, salt3, salt4, salt5);
        const s = this.exports.bdx(salt2, salt1, salt4, salt3, salt5);
        const t = this.exports.ndx(salt2, salt1, salt4, salt3, salt5);
        const u = this.exports.mdx(salt2, salt1, salt4, salt3, salt5);
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
        return { parsedAccessToken, parsedRefreshToken };
    }
}
//# sourceMappingURL=TokenParser.js.map