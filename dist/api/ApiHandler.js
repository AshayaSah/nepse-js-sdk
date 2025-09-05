import api_dict from "../utils/apis.js";
export class Apihandler {
    constructor(baseUrl, payloadParser, axios, accessToken) {
        this.baseUrl = baseUrl;
        this.payloadPrser = payloadParser;
        this.axios = axios;
        this.accessToken = accessToken;
    }
    async isMarketOpen() {
        const api = api_dict.marketopen_api.api;
        const method = api_dict.marketopen_api.method;
        const requestPayload = await this.payloadPrser.returnPayload(this.accessToken, null);
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
//# sourceMappingURL=ApiHandler.js.map