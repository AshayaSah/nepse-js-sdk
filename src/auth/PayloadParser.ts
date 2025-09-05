import axios from "../../node_modules/axios/index.js";
import api_dict, { type ApiList } from "../utils/apis.js";
import https from "https";

const ROOT_URL = "https://www.nepalstock.com";

// Interface for the token response (reusing from TokenService)
interface TokenResponse {
  serverTime: number;
  salt: string;
  accessToken: string;
  tokenType: string;
  refreshToken: string;
  salt1: number;
  salt2: number;
  salt3: number;
  salt4: number;
  salt5: number;
  isDisplayActive: boolean;
  popupDocFor: string;
}

// Type for access_token_value parameter [token, tokenResponse]
export type AccessTokenValue = [string, TokenResponse];

// Interface for the API response that contains an id
interface PayloadResponse {
  id: number;
  [key: string]: any;
}

const agent = new https.Agent({
  rejectUnauthorized: false, // same as Python's verify=False
});

export class PayloadParser {
  private dummyData: number[];
  private url: string;
  private method: string;
  private payload: object;
  private headers: object;

  constructor(api_dic?: ApiList) {
    this.dummyData = [
      147, 117, 239, 143, 157, 312, 161, 612, 512, 804, 411, 527, 170, 511, 421,
      667, 764, 621, 301, 106, 133, 793, 411, 511, 312, 423, 344, 346, 653, 758,
      342, 222, 236, 811, 711, 611, 122, 447, 128, 199, 183, 135, 489, 703, 800,
      745, 152, 863, 134, 211, 142, 564, 375, 793, 212, 153, 138, 153, 648, 611,
      151, 649, 318, 143, 117, 756, 119, 141, 717, 113, 112, 146, 162, 660, 693,
      261, 362, 354, 251, 641, 157, 178, 631, 192, 734, 445, 192, 883, 187, 122,
      591, 731, 852, 384, 565, 596, 451, 772, 624, 691,
    ];

    this.url = `${ROOT_URL}${api_dict.marketopen_api.api}`;
    this.method = api_dict.marketopen_api.method;
    this.payload = {};
    this.headers = {
      authority: "www.nepalstock.com",
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.5",
      referer: "https://www.nepalstock.com",
      "sec-ch-ua": '"Not_A Brand";v="99", "Brave";v="109", "Chromium";v="109"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    };
  }

  async returnPayload(
    accessTokenValue: AccessTokenValue,
    which?: "stock-live" | "sector-live" | string | null
  ): Promise<number> {
    const headers = {
      Authorization: `Salter ${accessTokenValue[0]}`,
      ...this.headers,
    };

    const config = {
      method: this.method as any,
      url: this.url,
      headers: headers,
      data: this.payload,
      httpsAgent: agent,
    };

    try {
      const response = await axios.request(config);

      const responseData = response.data as PayloadResponse;
      const givenId = responseData.id;
      console.log("\n\n\nThe Payload ID: ", givenId, "\n\n\n");

      const today = new Date().getDate(); // equivalent to datetime.now().day

      console.log(
        "\n\n\nThe payloadId from DummyData: ",
        this.dummyData[givenId],
        "\n\n\n"
      );

      let payloadId = (this.dummyData[givenId] ?? 0) + givenId + 2 * today;

      if (which === "stock-live") {
        return payloadId;
      }

      let indexValue: number;

      if (which === "sector-live") {
        if (payloadId % 10 < 5) {
          indexValue = 3;
        } else {
          indexValue = 1;
        }
      } else {
        if (payloadId % 10 < 5) {
          indexValue = 1;
        } else {
          indexValue = 3;
        }
      }

      const saltKey1 = `salt${indexValue + 1}` as keyof Pick<
        TokenResponse,
        "salt1" | "salt2" | "salt3" | "salt4" | "salt5"
      >;
      const saltKey2 = `salt${indexValue}` as keyof Pick<
        TokenResponse,
        "salt1" | "salt2" | "salt3" | "salt4" | "salt5"
      >;

      payloadId =
        payloadId +
        accessTokenValue[1][saltKey1] * today -
        accessTokenValue[1][saltKey2];

      return payloadId;
    } catch (error) {
      console.error("Error in returnPayload:", error);
      throw error;
    }
  }
}
