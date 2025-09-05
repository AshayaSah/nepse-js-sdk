import TokenParser from "./TokenParser.js";
import { TokenHandler } from "./TokenHandler.js";
import { PayloadParser } from "./PayloadParser.js";
import api_dict from "../utils/apis.js";
import https from "https"
import { Agent, fetch } from "../../node_modules/undici/index.js";
// import fetch from "node-fetch"

const agent = new Agent({
  connect: {
    rejectUnauthorized: false, 
  }, 
});


const ROOT_URL = "https://www.nepalstock.com";

interface QueryString {
  page?: string;           // "0", "1", etc.
  size?: string;           // "500", "1000", etc.
  businessDate?: string | null;  // date in YYYY-MM-DD format or null
  nDays?: number;          // number of days for the trading average
}

async function main() {
  const tokenParser = new TokenParser();
  const payloadParser = new PayloadParser();

  setTimeout(()=>{},2000);

  const handler = new TokenHandler(
    "https://nepalstock.com.np/api/authenticate/prove", // tokenUrl
    "GET",                                             // tokenMethod
    { "User-Agent": "Mozilla/5.0",
      "Accept": "application/json",
      "Content-Type": "application/json"
     },                   // headers
    payloadParser,
    tokenParser
  );

  try {
    // const [token, fullResp] = await handler.getValidToken();
    // console.log("Access Token:", token);
    // console.log("Full Response:", fullResp);


    // isMarketOpen(handler);
    getTradingAverage(handler)

    
  } catch (err) {
    console.error("Error fetching token:", err);
  }
}

async function isMarketOpen(handler: TokenHandler) {
    const api = ROOT_URL + api_dict.marketopen_api.api;
    const method = api_dict.marketopen_api.method;

    const accessToken = await handler.getValidToken();
    const querystring: QueryString = {
    };
    const response = await handler.returnData(api, accessToken, method, null, querystring)

    console.log("The data", response);
}


  async function getTradingAverage(handler : TokenHandler, date_: number | string | null = null, n_days: number = 120): Promise<any> {
    /**
     * Retrieve the trading average for the specified number of days ending on the given date (or today if date is not
     * specified).
     *
     * Args:
     *   date_: A string representing the date (YYYY-MM-DD) for which to retrieve the trading average. If null, today is used.
     *   n_days: Number of days to include in the trading average calculation (default = 120).
     *
     * Returns:
     *   JSON response from NEPSE API.
     *
     * Throws:
     *   Error if n_days is less than 1 or greater than 180.
     */
    if (n_days < 1 || n_days > 180) {
      throw new Error("n_days must be between 1 and 180");
    }

    date_ = String(new Date().getDate());
    console.log(date_)

    const api = ROOT_URL + api_dict["trading_average_api"].api;
    const method = api_dict["trading_average_api"].method;
    console.log(method)

    // const querystring: QueryString = {
    //   "page": "0",
    //   "size": "500",
    //   "businessDate": null,
    //   "nDays": n_days
    // };



    const accessToken = await handler.getValidToken();

    const answer = await fetchAPi( accessToken, method, api);
    console.log("\n\n\n The data: ", answer, "\n\n\n")
    // const response = await handler.returnData(api, accessToken, method, null, {})

    // console.log("The data", response);
  }


  const fetchAPi =async (accesstoken:string[], method:string,  api:string) =>{

    const headers = {
      Authorization: `Salter ${accesstoken[0]}`,
    };

    const teresponse = await fetch(api, {
      method:method,
      headers:headers,
       // @ts-ignore: Node fetch supports agent
      dispatcher: agent

    })
    const data =  await teresponse.json();
    console.log(data)
  } 

main();

