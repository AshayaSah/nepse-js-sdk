import { type RawAxiosRequestHeaders } from "../../node_modules/axios/index.js";
import type TokenParser from "../auth/TokenParser.js";
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
export declare class AccessTokenHandler {
    private tokenUrl;
    private tokenMethod;
    private headers;
    private tokenParser;
    constructor(headers: RawAxiosRequestHeaders, tokenParser: TokenParser);
    getValidToken(): Promise<[string, any]>;
}
//# sourceMappingURL=AccessTokenHandler.d.ts.map