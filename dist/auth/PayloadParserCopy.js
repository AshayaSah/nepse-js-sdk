import axios from "../../node_modules/axios/index.js";
import api_dict, {} from "../utils/apis.js";
import https from "https";
const ROOT_URL = "https://www.nepalstock.com";
const agent = new https.Agent({
    rejectUnauthorized: false, // same as Python's verify=False
});
export class PayloadParser {
    constructor(api_dic) {
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
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
        };
    }
    async returnPayload(accessTokenValue, which) {
        const config = {
            method: this.method,
            url: this.url,
            data: this.payload,
            httpsAgent: agent,
        };
        try {
            const response = await axios.request(config);
            const responseData = response.data;
            const givenId = responseData.id;
            console.log("\n\n\nThe Payload ID: ", givenId, "\n\n\n");
            const today = new Date().getDate(); // equivalent to datetime.now().day
            console.log("\n\n\nThe payloadId from DummyData: ", this.dummyData[givenId], "\n\n\n");
            let payloadId = (this.dummyData[givenId] ?? 0) + givenId + 2 * today;
            if (which === "stock-live") {
                return payloadId;
            }
            let indexValue;
            if (which === "sector-live") {
                if (payloadId % 10 < 5) {
                    indexValue = 3;
                }
                else {
                    indexValue = 1;
                }
            }
            else {
                if (payloadId % 10 < 5) {
                    indexValue = 1;
                }
                else {
                    indexValue = 3;
                }
            }
            const saltKey1 = `salt${indexValue + 1}`;
            const saltKey2 = `salt${indexValue}`;
            payloadId =
                payloadId +
                    accessTokenValue[1][saltKey1] * today -
                    accessTokenValue[1][saltKey2];
            return payloadId;
        }
        catch (error) {
            console.error("Error in returnPayload:", error);
            throw error;
        }
    }
}
//# sourceMappingURL=PayloadParserCopy.js.map