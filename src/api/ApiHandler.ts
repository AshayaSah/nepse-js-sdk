import type { AxiosInstance } from "../../node_modules/axios/index";
import type { AccessTokenValue, PayloadParser } from "../auth/PayloadParser";
import api_dict from "../utils/apis.js";

export interface TokenResponse {
  serverTime: number;
  salt: string;
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  salt1: number; // These get converted to numbers
  salt2: number;
  salt3: number;
  salt4: number;
  salt5: number;
  isDisplayActive: boolean;
  popupDocFor: string;
}

export class Apihandler {
  readonly baseUrl: string;

  readonly payloadPrser: PayloadParser;

  readonly axios: AxiosInstance;

  readonly accessToken: AccessTokenValue;

  constructor(
    baseUrl: string,
    payloadParser: PayloadParser,
    axios: AxiosInstance,
    accessToken: [string, TokenResponse]
  ) {
    this.baseUrl = baseUrl;
    this.payloadPrser = payloadParser;
    this.axios = axios;
    this.accessToken = accessToken;
  }

  async isMarketOpen() {
    const api = api_dict.marketopen_api.api;
    const method = api_dict.marketopen_api.method;

    const requestPayload = await this.payloadPrser.returnPayload(
      this.accessToken,
      null
    );

    console.log("\n\n\n The Request Payload: ", requestPayload, "\n\n\n");

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
