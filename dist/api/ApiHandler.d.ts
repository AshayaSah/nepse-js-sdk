import type { AxiosInstance } from "../../node_modules/axios/index";
import type { PayloadParser } from "../auth/PayloadParser";
export declare class Apihandler {
    readonly baseUrl: string;
    readonly payloadPrser: PayloadParser;
    readonly axios: AxiosInstance;
    constructor(baseUrl: string, payloadParser: PayloadParser, axios: AxiosInstance);
    isMarketOpen(): Promise<import("../../node_modules/axios/index").AxiosResponse<any, any>>;
}
//# sourceMappingURL=ApiHandler.d.ts.map