import { type AxiosInstance, type RawAxiosRequestHeaders } from "../../node_modules/axios/index.js";
import TokenParser from "../auth/TokenParser.js";
export declare function getAxiosClient(appURL: string, tokenParser: TokenParser, tokenType?: "Salter"): AxiosInstance;
export declare function getRequestHeaders(tokenParser: TokenParser, tokenType?: "Salter"): Promise<RawAxiosRequestHeaders>;
//# sourceMappingURL=axios.d.ts.map