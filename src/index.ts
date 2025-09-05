import { Nepse } from "./nepse/index.js";

async function main() {
  const nepseApp = new Nepse();
  const apis = nepseApp.api();

  setTimeout(() => {}, 2000);

  try {
    // const [token, fullResp] = await handler.getValidToken();
    // console.log("Access Token:", token);
    // console.log("Full Response:", fullResp);
    const data = await apis.isMarketOpen();
    console.log(data);
  } catch (err) {
    console.error("Error fetching token:", err);
  }
}

main();
