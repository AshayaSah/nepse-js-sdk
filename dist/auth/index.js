import TokenParser from "./TokenParser.js";
import { TokenHandler } from "./TokenHandler.js";
import { PayloadParser } from "./PayloadParser.js";
import api_dict from "../utils/apis.js";
const ROOT_URL = "https://www.nepalstock.com";
async function main() {
    const tokenParser = new TokenParser();
    const payloadParser = new PayloadParser();
    setTimeout(() => { }, 2000);
    const handler = new TokenHandler("https://nepalstock.com.np/api/authenticate/prove", // tokenUrl
    "GET", // tokenMethod
    { "User-Agent": "Mozilla/5.0" }, // headers
    payloadParser, tokenParser);
    try {
        // const [token, fullResp] = await handler.getValidToken();
        // console.log("Access Token:", token);
        // console.log("Full Response:", fullResp);
        isMarketOpen(handler);
    }
    catch (err) {
        console.error("Error fetching token:", err);
    }
}
async function isMarketOpen(handler) {
    const api = ROOT_URL + api_dict.marketopen_api.api;
    const method = api_dict.marketopen_api.method;
    const accessToken = await handler.getValidToken();
    const response = await handler.returnData(api, accessToken, method);
    console.log("The data", response);
}
main();
//# sourceMappingURL=index.js.map