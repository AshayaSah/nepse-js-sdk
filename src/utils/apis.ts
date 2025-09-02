export interface Api {
  api: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
}

export interface ApiList {
  authenticate_api: Api;
  today_price_api: Api;
  marketopen_api: Api;
  refer_api: Api;
  head_indices_api: Api;
  sectorwise_summary_api: Api;
  market_summary_history_api: Api;
  disclosure: Api;
  top_gainer: Api;
  top_loser: Api;
  top_turnover: Api;
  top_trade: Api;
  top_transaction: Api;
  market_summary_api: Api;
  security_api: Api;
  marketcap_api: Api;
  trading_average_api: Api;
  broker_api: Api;
  sector_api: Api;
  sector_index_api: Api;
  stock_live_api: Api;
  indices_live_api: Api;
  security: Api;
  ticker_info_api: Api;
  ticker_contact_api: Api;
  ticker_price_api: Api;
}

const api_dict: ApiList = {
  authenticate_api: { api: "/api/authenticate/prove", method: "GET" },
  today_price_api: { api: "/api/nots/nepse-data/today-price", method: "POST" },
  marketopen_api: { api: "/api/nots/nepse-data/market-open", method: "GET" },
  refer_api: { api: "", method: "GET" },
  // head_indices_api requires index ID, e.g. /api/nots/index/history/51
  head_indices_api: { api: "/api/nots/index/history", method: "GET" },
  sectorwise_summary_api: { api: "/api/nots/sectorwise", method: "GET" },
  market_summary_history_api: {
    api: "/api/nots/market-summary-history",
    method: "GET",
  },
  disclosure: { api: "/api/nots/news/companies/disclosure", method: "GET" },
  top_gainer: { api: "/api/nots/top-ten/top-gainer", method: "GET" },
  top_loser: { api: "/api/nots/top-ten/top-loser", method: "GET" },
  top_turnover: { api: "/api/nots/top-ten/turnover", method: "GET" },
  top_trade: { api: "/api/nots/top-ten/trade", method: "GET" },
  top_transaction: { api: "/api/nots/top-ten/transaction", method: "GET" },
  market_summary_api: { api: "/api/nots/market-summary", method: "GET" },
  security_api: { api: "/api/nots/company/list", method: "GET" },
  marketcap_api: { api: "/api/nots/nepse-data/marcapbydate", method: "GET" },
  trading_average_api: {
    api: "/api/nots/nepse-data/trading-average",
    method: "GET",
  },
  broker_api: { api: "/api/nots/member", method: "POST" },
  sector_api: { api: "/api/nots/sector", method: "GET" },
  sector_index_api: { api: "/api/nots/index", method: "GET" },
  stock_live_api: { api: "/api/nots/lives-market", method: "GET" },
  indices_live_api: { api: "/api/nots/graph/index", method: "POST" },
  security: { api: "/api/nots/security", method: "GET" },
  ticker_info_api: { api: "/api/nots/security", method: "POST" },
  ticker_contact_api: { api: "/api/nots/security/profile", method: "GET" },
  ticker_price_api: {
    api: "/api/nots/market/security/price",
    method: "GET",
  },
};

export default api_dict;
