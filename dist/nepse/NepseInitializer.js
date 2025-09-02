import { getAxiosClient } from "../utils/axios";
const ROOT_URL = 'https://www.nepalstock.com';
export class NepseInitializer {
    constructor() {
        this.axios = getAxiosClient(ROOT_URL);
    }
}
//# sourceMappingURL=NepseInitializer.js.map