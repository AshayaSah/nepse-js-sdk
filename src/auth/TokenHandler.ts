import https from "https";
import TokenParser from "./TokenParser.js";
import axios from "../../node_modules/axios/index.js";

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


export class TokenHandler {
  private tokenUrl: string;
  private tokenMethod: "GET" | "POST";
  private headers: Record<string, string>;
  private tokenParser: TokenParser;

  constructor(
    tokenUrl: string,
    tokenMethod: "GET" | "POST",
    headers: Record<string, string>,
    tokenParser: TokenParser
  ) {
    this.tokenUrl = tokenUrl;
    this.tokenMethod = tokenMethod;
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
