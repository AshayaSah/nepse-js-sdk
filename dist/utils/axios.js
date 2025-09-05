import axios, {} from "../../node_modules/axios/index.js";
import TokenParser from "../auth/TokenParser.js";
import { AccessTokenHandler } from "../api/AccessTokenHandler.js";
export function getAxiosClient(appURL, tokenParser, tokenType) {
    const axiosInstance = axios.create({
        baseURL: appURL,
        withCredentials: true,
    });
    let AccessToken;
    // Add request interceptor to dynamically set access token and auth token
    axiosInstance.interceptors.request.use(async (config) => {
        const { headers, accessToken } = await getRequestHeaders(tokenParser, tokenType);
        console.log(accessToken);
        AccessToken = accessToken;
        Object.assign(config.headers, headers);
        return config;
    });
    return {
        axiosInstance,
        getAccessToken: () => AccessToken,
    };
}
export async function getRequestHeaders(tokenParser, tokenType) {
    // Custom Header
    const headers = {
        authority: "www.nepalstock.com",
        accept: "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.5",
        referer: "https://www.nepalstock.com",
        "sec-ch-ua": '"Not_A Brand";v="99", "Brave";v="109", "Chromium";v="109"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "sec-gpc": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    };
    const accessTokenParser = new AccessTokenHandler(headers, tokenParser);
    setTimeout(() => { }, 2000);
    const accessToken = await accessTokenParser.getValidToken();
    console.log("\n\n\nThe Access Token: ", accessToken, "\n\n\n");
    headers.Authorization = `${tokenType} ${accessToken[0]}`;
    return { headers, accessToken };
}
//# sourceMappingURL=axios.js.map