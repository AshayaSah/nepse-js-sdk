import type { promises } from "dns";
import axios, { type AxiosInstance, type RawAxiosRequestHeaders } from "../../node_modules/axios/index";
import { PayloadParser } from "../auth/PayloadParser";
import { TokenHandler } from "../auth/TokenHandler";
import TokenParser from "../auth/TokenParser";

export function getAxiosClient(
  appURL: string,
  tokenType?: 'Salter',
): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: appURL,
    withCredentials: true,
  });

  // Add request interceptor to dynamically set access token and auth token
  axiosInstance.interceptors.request.use(async (config) => {
    
    return config;
  });

  return axiosInstance;
}

export async function getRequestHeaders(
  tokenType?: 'Salter',
): Promise<RawAxiosRequestHeaders> {

  const headers: RawAxiosRequestHeaders = {
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
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
    };

    return headers;
}
