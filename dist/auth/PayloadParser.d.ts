import { type ApiList } from "../utils/apis.js";
interface TokenResponse {
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
type AccessTokenValue = [string, TokenResponse];
export declare class PayloadParser {
    private dummyData;
    private url;
    private method;
    private payload;
    private headers;
    constructor(api_dic?: ApiList);
    returnPayload(accessTokenValue: AccessTokenValue, which?: 'stock-live' | 'sector-live' | string | null): Promise<number>;
}
export {};
//# sourceMappingURL=PayloadParser.d.ts.map