import type { AxiosInstance } from "../../node_modules/axios/index";
import { getAxiosClient } from "../utils/axios";

const ROOT_URL = 'https://www.nepalstock.com';

export class NepseInitializer {
    readonly axios: AxiosInstance;

    constructor(){
        this.axios = getAxiosClient(ROOT_URL)
    }
}