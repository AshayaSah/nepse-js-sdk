import TokenParser from "./TokenParser.js";
import { PayloadParser } from "./PayloadParser.js";
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
interface RequestApiOptions {
    url: string;
    accessToken: AccessTokenValue;
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    whichPayload?: string | null;
    queryString?: Record<string, string> | null;
    payload?: any;
    headers?: Headers;
}
type AccessTokenValue = [string, TokenResponse];
interface Headers {
    [key: string]: string;
}
export declare class TokenHandler {
    private tokenUrl;
    private tokenMethod;
    private headers;
    private tokenParser;
    private payloadParser;
    constructor(tokenUrl: string, tokenMethod: "GET" | "POST", headers: Record<string, string>, payloadParser: PayloadParser, tokenParser: TokenParser);
    requestApi({ url, accessToken, method, whichPayload, queryString, payload, }: RequestApiOptions): Promise<Response>;
    getValidToken(): Promise<[string, any]>;
    returnData(url: string, accessToken: AccessTokenValue, method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH", whichPayload?: string | null, queryString?: Record<string, string> | null, payload?: any): Promise<Response>;
}
export {};
//# sourceMappingURL=TokenHandler.d.ts.map