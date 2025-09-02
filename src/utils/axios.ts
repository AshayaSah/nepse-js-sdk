import axios, { type AxiosInstance, type RawAxiosRequestHeaders } from "../../node_modules/axios/index";

export function getAxiosClient(
  appURL: string,
  useToken?: boolean,
  token?: () => string,
  tokenType?: 'Bearer' | 'token',
  customHeaders?: object
): AxiosInstance {
  const axiosInstance = axios.create({
    baseURL: appURL,
    headers: getRequestHeaders(useToken, tokenType, token, appURL, customHeaders),
    withCredentials: true,
  });

  // Add request interceptor to dynamically set access token and auth token
  axiosInstance.interceptors.request.use((config) => {
    // Update CSRF token on each request if available
    if (typeof window !== 'undefined' && window.access_token && window.access_token !== '{{ access_token }}') {
      config.headers['X-Frappe-CSRF-Token'] = window.access_token;
    }

    // Update authorization token if using token auth
    if (useToken && tokenType && token) {
      config.headers.Authorization = `${tokenType} ${token()}`;
    }

    return config;
  });

  return axiosInstance;
}

export function getRequestHeaders(
  useToken: boolean = false,
  tokenType?: 'Bearer' | 'token',
  token?: () => string,
  appURL?: string,
  customHeaders?: object
): RawAxiosRequestHeaders {
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
