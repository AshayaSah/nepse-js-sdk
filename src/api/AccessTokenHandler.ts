import https from "https";
import axios, {
  type RawAxiosRequestHeaders,
} from "../../node_modules/axios/index.js";
import type TokenParser from "../auth/TokenParser.js";
import type { PayloadParser } from "../auth/PayloadParser.js";

const agent = new https.Agent({
  rejectUnauthorized: false, // same as Python's verify=False
});

interface QueryString {
  page?: string; // "0", "1", etc.
  size?: string; // "500", "1000", etc.
  businessDate?: string | null; // date in YYYY-MM-DD format or null
  nDays?: number; // number of days for the trading average
}

// Type for the raw response from the API (with string salts)
interface RawTokenResponse {
  serverTime: number;
  salt: string;
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  salt1: string; // These come as strings from API
  salt2: string;
  salt3: string;
  salt4: string;
  salt5: string;
  isDisplayActive: boolean;
  popupDocFor: string;
}

// Type for the processed response (with number salts)
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

interface RequestApiOptions {
  url: string;
  accessToken: AccessTokenValue; // Assuming accessToken is a single-item array as in the Python code
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  whichPayload?: string | null;
  queryString?: QueryString;
  payload?: any; // Flexible type for payload, can be refined based on use case
  headers?: Headers;
}

// Type for access_token_value parameter [token, tokenResponse]
type AccessTokenValue = [string, TokenResponse];

interface Headers {
  [key: string]: string;
}

const ACCESS_TOKEN_URL = "https://nepalstock.com.np/api/authenticate/prove";
const ACCESS_TOKEN_METHOD = "GET";

export class AccessTokenHandler {
  private tokenUrl: string = ACCESS_TOKEN_URL;
  private tokenMethod: "GET" = ACCESS_TOKEN_METHOD;
  private headers: RawAxiosRequestHeaders;
  private tokenParser: TokenParser;

  constructor(headers: RawAxiosRequestHeaders, tokenParser: TokenParser) {
    this.headers = headers;
    this.tokenParser = tokenParser;
  }

  async getValidToken(): Promise<[string, any]> {
    try {
      const config = {
        url: this.tokenUrl,
        method: this.tokenMethod,
        headers: this.headers,
        httpsAgent: agent,
      };

      const response = await axios.request(config);
      const rawTokenResponse = response.data as RawTokenResponse;
      console.log("Token Response: ", rawTokenResponse);

      // Create processed response with converted salts
      const tokenResponse: TokenResponse = {
        ...rawTokenResponse,
        salt1: parseInt(rawTokenResponse.salt1, 10),
        salt2: parseInt(rawTokenResponse.salt2, 10),
        salt3: parseInt(rawTokenResponse.salt3, 10),
        salt4: parseInt(rawTokenResponse.salt4, 10),
        salt5: parseInt(rawTokenResponse.salt5, 10),
      };

      const parsed = this.tokenParser.parseTokenResponse(tokenResponse);
      console.log("\n\n\nParsed: ", parsed, "\n\n\n");

      return [parsed[0], tokenResponse];
    } catch (err) {
      console.error("Error fetching token:", err);
      throw err;
    }
  }
}
