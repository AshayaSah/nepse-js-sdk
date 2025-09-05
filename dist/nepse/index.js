import { Apihandler } from "../api/ApiHandler.js";
import { PayloadParser } from "../auth/PayloadParser.js";
import TokenParser from "../auth/TokenParser.js";
import { getAxiosClient } from "../utils/axios.js";
const ROOT_URL = "https://www.nepalstock.com";
const TOKEN_TYPE = "Salter";
export class Nepse {
    constructor() {
        //   Initializing Token Parser
        this.tokenParser = new TokenParser();
        // Initializing Payload Parser
        this.payloadParser = new PayloadParser();
        this.url = ROOT_URL;
        const { axiosInstance, AccessToken } = getAxiosClient(ROOT_URL, this.tokenParser, TOKEN_TYPE);
        this.axios = axiosInstance;
        this.accessToken = AccessToken;
    }
    api() {
        return new Apihandler(ROOT_URL, this.payloadParser, this.axios, this.accessToken);
    }
}
//# sourceMappingURL=index.js.map