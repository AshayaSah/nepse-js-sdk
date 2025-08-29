interface TokenResponse {
    accessToken: string;
    refreshToken: string;
    salt1: number;
    salt2: number;
    salt3: number;
    salt4: number;
    salt5: number;
}
declare class TokenParser {
    private instance;
    private isInitialized;
    constructor();
    private initializeWasm;
    parseTokenResponse(tokenResponse: TokenResponse): [string, string];
}
declare class PayloadParser {
    private dummyData;
    private defaultHeaders;
    constructor();
    private getApiEndpoint;
    returnPayload(accessTokenValue: [string, TokenResponse], which?: string, apiKey?: string, indexId?: string): Promise<number>;
    getApiConfig(apiKey: string): {
        api: string;
        method: string;
    };
    getAvailableApis(): string[];
    buildApiUrl(apiKey: string, indexId?: string): string;
}
declare class NepseClient {
    private tokenParser;
    private payloadParser;
    private currentTokens;
    constructor();
    authenticate(): Promise<[string, TokenResponse]>;
    makeApiCall(apiKey: string, indexId?: string, which?: string): Promise<any>;
    getTodayPrice(which?: string): Promise<any>;
    getMarketSummary(): Promise<any>;
    getTopGainers(): Promise<any>;
    getTopLosers(): Promise<any>;
    getSectorwiseSummary(): Promise<any>;
    getIndexHistory(indexId: string): Promise<any>;
    getStockLive(): Promise<any>;
    getIndicesLive(): Promise<any>;
    getAvailableApis(): string[];
}
export { TokenParser, PayloadParser, NepseClient };
declare const nepseClient: NepseClient;
export default nepseClient;
//# sourceMappingURL=index.d.ts.map