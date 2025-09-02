import TokenParser from "./TokenParser.js";
import { TokenHandler } from "./TokenHandler.js";
async function main() {
    const tokenParser = new TokenParser();
    const handler = new TokenHandler("https://nepalstock.com.np/api/authenticate/prove", // tokenUrl
    "GET", // tokenMethod
    { "User-Agent": "Mozilla/5.0" }, // headers
    tokenParser);
    try {
        const [token, fullResp] = await handler.getValidToken();
        console.log("Access Token:", token);
        console.log("Full Response:", fullResp);
    }
    catch (err) {
        console.error("Error fetching token:", err);
    }
}
main();
//# sourceMappingURL=index.js.map