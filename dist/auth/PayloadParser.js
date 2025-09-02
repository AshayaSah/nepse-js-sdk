import api_dict, {} from "../utils/apis.js";
const ROOT_URL = "https://www.nepalstock.com";
class PayloadParser {
    constructor(api_dic) {
        this.dummyData = [
            147, 117, 239, 143, 157, 312, 161, 612, 512, 804, 411, 527, 170, 511, 421,
            667, 764, 621, 301, 106, 133, 793, 411, 511, 312, 423, 344, 346, 653, 758,
            342, 222, 236, 811, 711, 611, 122, 447, 128, 199, 183, 135, 489, 703, 800,
            745, 152, 863, 134, 211, 142, 564, 375, 793, 212, 153, 138, 153, 648, 611,
            151, 649, 318, 143, 117, 756, 119, 141, 717, 113, 112, 146, 162, 660, 693,
            261, 362, 354, 251, 641, 157, 178, 631, 192, 734, 445, 192, 883, 187, 122,
            591, 731, 852, 384, 565, 596, 451, 772, 624, 691
        ];
        this.url = `${ROOT_URL}${api_dict.marketopen_api.api}`;
        this.method = api_dict.marketopen_api.method;
        this.payload = {};
        this.headers = {
            "authority": "www.nepalstock.com",
            "accept": "application/json, text/plain, */*",
            "accept-language": "en-US,en;q=0.5",
            "referer": "https://www.nepalstock.com",
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
}
//# sourceMappingURL=PayloadParser.js.map