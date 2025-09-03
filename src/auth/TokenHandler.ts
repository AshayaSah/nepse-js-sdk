import https from "https";
import TokenParser from "./TokenParser.js";
import axios from "../../node_modules/axios/index.js";
import { PayloadParser } from "./PayloadParser.js";

const agent = new https.Agent({
  rejectUnauthorized: false, // same as Python's verify=False
});

// Type for the raw response from the API (with string salts)
interface RawTokenResponse {
  serverTime: number;
  salt: string;
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  salt1: string;  // These come as strings from API
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
  salt1: number;  // These get converted to numbers
  salt2: number;
  salt3: number;
  salt4: number;
  salt5: number;
  isDisplayActive: boolean;
  popupDocFor: string;
}

interface RequestApiOptions {
  url: string;
  accessToken: AccessTokenValue // Assuming accessToken is a single-item array as in the Python code
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  whichPayload?: string | null;
  queryString?: Record<string, string> | null;
  payload?: any; // Flexible type for payload, can be refined based on use case
  headers?: Headers;
}

// Type for access_token_value parameter [token, tokenResponse]
type AccessTokenValue = [string, TokenResponse];

interface Headers {
  [key: string]: string;
}

export class TokenHandler {
  private tokenUrl: string;
  private tokenMethod: "GET" | "POST";
  private headers: Record<string, string>;
  private tokenParser: TokenParser;
  private payloadParser: PayloadParser;

  constructor(
    tokenUrl: string,
    tokenMethod: "GET" | "POST",
    headers: Record<string, string>,
    payloadParser: PayloadParser,
    tokenParser: TokenParser
  ) {
    this.tokenUrl = tokenUrl;
    this.tokenMethod = tokenMethod;
    this.headers = headers;
    this.payloadParser = payloadParser;
    this.tokenParser = tokenParser;
  }

  async requestApi({
    url,
    accessToken,
    method = 'GET',
    whichPayload = null,
    queryString = null,
    payload = null,
  }: RequestApiOptions): Promise<Response> {
    /**
     * This function returns the data from the requested URL in JSON format.
     *
     * @param url - The URL of the API to get data from.
     * @param accessToken - The access token generated from getValidToken function.
     * @param method - Optional HTTP method ('GET' or 'POST'). Defaults to 'GET'.
     * @param whichPayload - Optional parameter for payload generation.
     * @param queryString - Optional query string parameters.
     * @param payload - Optional payload for the request.
     * @returns A Promise resolving to the fetch Response object.
     * @throws Error if the request fails.
     */
    try {
      // Prepare headers
      const requestHeaders: Headers = {
        Authorization: `Salter ${accessToken[0]}`,
        ...this.headers,
      };

      // Prepare payload
      const requestPayload = payload ?? await this.payloadParser.returnPayload(accessToken, whichPayload);

      console.log("\n\n\n The Request Payload: ", requestPayload, "\n\n\n");

      const date_ = new Date('2024-01-15').toISOString().split('T')[0];

      const  queryString = {"page": "0", "size": "500", "businessDate": date_}

      // Send the request
      const config = {
        method: method,
        url: url,
        headers: requestHeaders,
        json: requestPayload,
        params: queryString,
        httpsAgent: agent,
      };

      const response = await axios.request(config);
      const reqResponse = response.data;
      console.log(reqResponse)

      return reqResponse;
    } catch (error) {
      throw new Error(`Error sending request: ${error}`);
    }
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

  async returnData(
    url: string,
    accessToken: AccessTokenValue,
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    whichPayload: string | null = null,
    queryString: Record<string, string> | null = null,
    payload: any = null
  ): Promise<Response> {
    /**
     * Calls requestApi with the provided parameters to fetch data from the API.
     *
     * @param url - The URL of the API to get data from.
     * @param accessToken - The access token generated from getValidToken function.
     * @param method - Optional HTTP method ('GET' or 'POST'). Defaults to 'GET'.
     * @param whichPayload - Optional parameter for payload generation.
     * @param queryString - Optional query string parameters.
     * @param payload - Optional payload for the request.
     * @returns A Promise resolving to the fetch Response object.
     */
    return this.requestApi({
      url,
      accessToken,
      method,
      whichPayload,
      queryString,
      payload,
    });
  }

}
