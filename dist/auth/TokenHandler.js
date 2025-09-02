import https from "https";
import TokenParser from "./TokenParser.js";
import axios from "../../node_modules/axios/index.js";
const agent = new https.Agent({
    rejectUnauthorized: false, // same as Python's verify=False
});
export class TokenHandler {
    constructor(tokenUrl, tokenMethod, headers, tokenParser) {
        this.tokenUrl = tokenUrl;
        this.tokenMethod = tokenMethod;
        this.headers = headers;
        this.tokenParser = tokenParser;
    }
    async getValidToken() {
        try {
            const config = {
                url: this.tokenUrl,
                method: this.tokenMethod,
                headers: this.headers,
                httpsAgent: agent,
            };
            const response = await axios.request(config);
            const rawTokenResponse = response.data;
            console.log("Token Response: ", rawTokenResponse);
            // Create processed response with converted salts
            const tokenResponse = {
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
        }
        catch (err) {
            console.error("Error fetching token:", err);
            throw err;
        }
    }
}
//# sourceMappingURL=TokenHandler.js.map