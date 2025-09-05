import type { AxiosInstance } from "../../node_modules/axios/index";
import { Apihandler } from "../api/ApiHandler.js";
import { PayloadParser, type AccessTokenValue } from "../auth/PayloadParser.js";
import TokenParser from "../auth/TokenParser.js";
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
export declare class Nepse {
    /**  Nepse URL */
    readonly url: string;
    readonly axios: AxiosInstance;
    readonly accessToken: AccessTokenValue;
    readonly tokenParser: TokenParser;
    readonly payloadParser: PayloadParser;
    constructor();
    api(): Apihandler;
}
//# sourceMappingURL=index.d.ts.map