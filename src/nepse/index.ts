import type { AxiosInstance } from "../../node_modules/axios/index";
import { Apihandler } from "../api/ApiHandler.js";
import { PayloadParser } from "../auth/PayloadParser.js";
import TokenParser from "../auth/TokenParser.js";
import { getAxiosClient } from "../utils/axios.js";

const ROOT_URL = "https://www.nepalstock.com";
const TOKEN_TYPE = "Salter";

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

export class Nepse {
  /**  Nepse URL */
  readonly url: string;

  // Axios Instance
  readonly axios: AxiosInstance;

  //   Initializing Token Parser
  readonly tokenParser = new TokenParser();

  // Initializing Payload Parser
  readonly payloadParser = new PayloadParser();

  constructor() {
    this.url = ROOT_URL;
    this.axios = getAxiosClient(ROOT_URL, this.tokenParser, TOKEN_TYPE);
  }

  api() {
    return new Apihandler(ROOT_URL, this.payloadParser, this.axios);
  }
}
