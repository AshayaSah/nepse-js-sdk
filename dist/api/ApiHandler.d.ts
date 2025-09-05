import type { AxiosInstance } from "../../node_modules/axios/index";
import type { AccessTokenValue, PayloadParser } from "../auth/PayloadParser";
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
export declare class Apihandler {
    readonly baseUrl: string;
    readonly payloadPrser: PayloadParser;
    readonly axios: AxiosInstance;
    readonly accessToken: AccessTokenValue;
    constructor(baseUrl: string, payloadParser: PayloadParser, axios: AxiosInstance, accessToken: [string, TokenResponse]);
    isMarketOpen(): Promise<import("../../node_modules/axios/index").AxiosResponse<any, any>>;
}
//# sourceMappingURL=ApiHandler.d.ts.map