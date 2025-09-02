import { type AxiosInstance, type RawAxiosRequestHeaders } from "../../node_modules/axios/index";
export declare function getAxiosClient(appURL: string, useToken?: boolean, token?: () => string, tokenType?: 'Bearer' | 'token', customHeaders?: object): AxiosInstance;
export declare function getRequestHeaders(useToken?: boolean, tokenType?: 'Bearer' | 'token', token?: () => string, appURL?: string, customHeaders?: object): RawAxiosRequestHeaders;
//# sourceMappingURL=axios.d.ts.map