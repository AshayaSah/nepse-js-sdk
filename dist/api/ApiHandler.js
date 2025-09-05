import api_dict from "../utils/apis.js";
export class Apihandler {
    constructor(baseUrl, payloadParser, axios) {
        this.baseUrl = baseUrl;
        this.payloadPrser = payloadParser;
        this.axios = axios;
    }
    async isMarketOpen() {
        const api = api_dict.marketopen_api.api;
        const method = api_dict.marketopen_api.method;
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