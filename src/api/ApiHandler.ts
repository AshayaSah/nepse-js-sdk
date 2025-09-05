import type { AxiosInstance } from "../../node_modules/axios/index";
import type { PayloadParser } from "../auth/PayloadParser";
import api_dict from "../utils/apis.js";

export class Apihandler {
  readonly baseUrl: string;

  readonly payloadPrser: PayloadParser;

  readonly axios: AxiosInstance;

  constructor(
    baseUrl: string,
    payloadParser: PayloadParser,
    axios: AxiosInstance
  ) {
    this.baseUrl = baseUrl;
    this.payloadPrser = payloadParser;
    this.axios = axios;
  }

  async isMarketOpen() {
    const api = api_dict.marketopen_api.api;
    const method = api_dict.marketopen_api.method;

    return this.axios
      .get(api)
      .then((res) => res)
      .catch((error) => {
        throw {
          ...error.response,
        };
      });
  }
}
