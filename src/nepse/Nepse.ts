import type { AxiosInstance } from "../../node_modules/axios/index";
import { getAxiosClient } from "../utils/axios";

const ROOT_URL = 'https://www.nepalstock.com';
const TOKEN_TYPE = "Salter";

export class Nepse {
    /**  Nepse URL */
    readonly url: string;

    // Axios Instance 
    readonly axios: AxiosInstance;

    constructor(){
        this.url = ROOT_URL;
        this.axios = getAxiosClient(ROOT_URL, TOKEN_TYPE);
    }

}