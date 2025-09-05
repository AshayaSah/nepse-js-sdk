import { type AxiosInstance, type RawAxiosRequestHeaders } from "../../node_modules/axios/index.js";
import TokenParser from "../auth/TokenParser.js";
import type { AccessTokenValue } from "../auth/PayloadParser.js";
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
interface RequestHeadersResponse {
    headers: RawAxiosRequestHeaders;
    accessToken: [string, TokenResponse];
}
export interface getAxiosClientResponse {
    axiosInstance: AxiosInstance;
    getAccessToken: () => AccessTokenValue | undefined;
}
export declare function getAxiosClient(appURL: string, tokenParser: TokenParser, tokenType?: "Salter"): getAxiosClientResponse;
export declare function getRequestHeaders(tokenParser: TokenParser, tokenType?: "Salter"): Promise<RequestHeadersResponse>;
export {};
//# sourceMappingURL=axios.d.ts.map