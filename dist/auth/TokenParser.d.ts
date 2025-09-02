declare class TokenParser {
    private cdx;
    private rdx;
    private bdx;
    private ndx;
    private mdx;
    constructor();
    parseTokenResponse(tokenResponse: {
        salt1: number;
        salt2: number;
        salt3: number;
        salt4: number;
        salt5: number;
        accessToken: string;
        refreshToken: string;
    }): [string, string];
}
export default TokenParser;
//# sourceMappingURL=TokenParser.d.ts.map