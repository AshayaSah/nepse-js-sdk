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
declare const api_dict: ApiList;
export default api_dict;
//# sourceMappingURL=apis.d.ts.map