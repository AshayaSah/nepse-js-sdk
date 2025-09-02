import TokenParser from "./TokenParser.js";
export interface TokenResponse {
    serverTime: number;
    salt: string;
    accessToken: string;
    tokenType: string;
    refreshToken: string;
    salt1: number;
    salt2: number;
    salt3: number;
    salt4: number;
    salt5: number;
    isDisplayActive: boolean;
    popupDocFor: string;
}
export declare class TokenService {
    private tokenUrl;
    private tokenMethod;
    private headers;
    private tokenParser;
    constructor(tokenUrl: string, tokenMethod: "GET" | "POST", headers: Record<string, string>, tokenParser: TokenParser);
    getValidToken(): Promise<[string, any]>;
}
//# sourceMappingURL=index.d.ts.map