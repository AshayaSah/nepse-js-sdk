import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  salt1: number;
  salt2: number;
  salt3: number;
  salt4: number;
  salt5: number;
}

interface ApiDict {
  [key: string]: {
    api: string;
    method: string;
  };
}

interface WasmExports {
  [key: string]: Function;
}

// --- CONFIGS ---
const ROOT_URL = "https://www.nepalstock.com";

const api_dict: ApiDict = {
  "authenticate_api": {"api": "/api/authenticate/prove", "method": "GET"},
  "today_price_api": {"api": "/api/nots/nepse-data/today-price", "method": "POST"},
  "marketopen_api": {"api": "/api/nots/nepse-data/market-open", "method": "GET"},
  "refer_api": {"api": "", "method": "GET"},
  "head_indices_api": {"api": "/api/nots/index/history", "method": "GET"},
  "sectorwise_summary_api": {"api": "/api/nots/sectorwise", "method": "GET"},
  "market_summary_history_api": {"api": "/api/nots/market-summary-history", "method": "GET"},
  "disclosure": {"api": "/api/nots/news/companies/disclosure", "method": "GET"},
  "top_gainer": {"api": "/api/nots/top-ten/top-gainer", "method": "GET"},
  "top_loser": {"api": "/api/nots/top-ten/top-loser", "method": "GET"},
  "top_turnover": {"api": "/api/nots/top-ten/turnover", "method": "GET"},
  "top_trade": {"api": "/api/nots/top-ten/trade", "method": "GET"},
  "top_transaction": {"api": "/api/nots/top-ten/transaction", "method": "GET"},
  "market_summary_api": {"api": "/api/nots/market-summary", "method": "GET"},
  "security_api": {"api": "/api/nots/company/list", "method": "GET"},
  "marketcap_api": {"api": "/api/nots/nepse-data/marcapbydate", "method": "GET"},
  "trading_average_api": {"api": "/api/nots/nepse-data/trading-average", "method": "GET"},
  "broker_api": {"api": "/api/nots/member", "method": "POST"},
  "sector_api": {"api": "/api/nots/sector", "method": "GET"},
  "sector_index_api": {"api": "/api/nots/index", "method": "GET"},
  "stock_live_api": {"api": "/api/nots/lives-market", "method": "GET"},
  "indices_live_api": {"api": "/api/nots/graph/index", "method": "POST"},
  "security": {"api": "/api/nots/security", "method": "GET"},
  "ticker_info_api": {"api": "/api/nots/security", "method": "POST"},
  "ticker_contact_api": {"api": "/api/nots/security/profile", "method": "GET"},
  "ticker_price_api": {"api": "/api/nots/market/security/price", "method": "GET"}
};

// =======================
// TOKEN PARSER
// =======================
class TokenParser {
  private instance: WebAssembly.Instance | null = null;
  private isInitialized: boolean = false;

  constructor() {
    try {
      this.initializeWasm();
    } catch (error) {
      console.error("Failed to initialize TokenParser:", error);
    }
  }

  private initializeWasm(): void {
    try {
      // ESM replacement for __dirname
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const wasmPath = path.resolve(__dirname, "nepse.wasm");
      console.log("WASM Path:", wasmPath);

      // Check if WASM file exists
      if (!fs.existsSync(wasmPath)) {
        throw new Error(`WASM file not found at path: ${wasmPath}`);
      }

      const wasmBuffer = fs.readFileSync(wasmPath);
      
      if (wasmBuffer.length === 0) {
        throw new Error("WASM file is empty");
      }

      const module = new WebAssembly.Module(wasmBuffer);
      this.instance = new WebAssembly.Instance(module, {});

      // Log available exports to debug
      const exports = this.instance.exports as WasmExports;
      console.log("Available WASM exports:", Object.keys(exports));
      
      // Check if we have any callable functions
      const functionExports = Object.keys(exports).filter(key => 
        typeof exports[key] === 'function'
      );
      
      if (functionExports.length === 0) {
        throw new Error("No callable functions found in WASM exports");
      }
      
      console.log("Available WASM functions:", functionExports);

      this.isInitialized = true;
      console.log("WASM initialized successfully");
      console.log("Available WASM exports:", Object.keys(this.instance.exports));
    } catch (error) {
      console.error("WASM initialization failed:", error);
      throw error;
    }
  }

  parseTokenResponse(tokenResponse: TokenResponse): [string, string] {
    if (!this.isInitialized || !this.instance) {
      throw new Error("TokenParser not properly initialized. WASM module failed to load.");
    }

    try {
      const exports = this.instance.exports as WasmExports;

      // Validate token response
      if (!tokenResponse.accessToken || !tokenResponse.refreshToken) {
        throw new Error("Invalid token response: missing access or refresh token");
      }

      const { salt1, salt2, salt3, salt4, salt5 } = tokenResponse;

      // Validate salts are numbers
      if ([salt1, salt2, salt3, salt4, salt5].some(salt => typeof salt !== 'number')) {
        throw new Error("Invalid token response: salts must be numbers");
      }

      // Check if we have the required functions, if not, return tokens as-is
      const requiredFunctions = ['cdx', 'rdx', 'bdx', 'ndx', 'mdx'];
      const hasAllFunctions = requiredFunctions.every(func => typeof exports[func] === 'function');
      
      if (!hasAllFunctions) {
        console.warn("WASM functions not available, returning original tokens");
        console.warn("Missing functions:", requiredFunctions.filter(func => typeof exports[func] !== 'function'));
        return [tokenResponse.accessToken, tokenResponse.refreshToken];
      }

      // Type-safe function access with validation
      const cdx = exports.cdx as (a: number, b: number, c: number, d: number, e: number) => number;
      const rdx = exports.rdx as (a: number, b: number, c: number, d: number, e: number) => number;
      const bdx = exports.bdx as (a: number, b: number, c: number, d: number, e: number) => number;
      const ndx = exports.ndx as (a: number, b: number, c: number, d: number, e: number) => number;
      const mdx = exports.mdx as (a: number, b: number, c: number, d: number, e: number) => number;

      // Calculate indices for access token
      const n = cdx(salt1, salt2, salt3, salt4, salt5);
      const l = rdx(salt1, salt2, salt3, salt4, salt5);
      const o = bdx(salt1, salt2, salt3, salt4, salt5);
      const p = ndx(salt1, salt2, salt3, salt4, salt5);
      const q = mdx(salt1, salt2, salt3, salt4, salt5);

      // Calculate indices for refresh token
      const i = cdx(salt2, salt1, salt3, salt5, salt4);
      const r = rdx(salt2, salt1, salt3, salt4, salt5);
      const s = bdx(salt2, salt1, salt4, salt3, salt5);
      const t = ndx(salt2, salt1, salt4, salt3, salt5);
      const u = mdx(salt2, salt1, salt4, salt3, salt5);

      const accessToken = tokenResponse.accessToken;
      const refreshToken = tokenResponse.refreshToken;

      // Validate indices are within bounds
      const validateIndex = (index: number, tokenLength: number, tokenType: string) => {
        if (index < 0 || index >= tokenLength) {
          throw new Error(`Invalid ${tokenType} token index: ${index} (token length: ${tokenLength})`);
        }
      };

      [n, l, o, p, q].forEach(index => validateIndex(index, accessToken.length, "access"));
      [i, r, s, t, u].forEach(index => validateIndex(index, refreshToken.length, "refresh"));

      // Parse tokens by removing characters at calculated indices
      const parsedAccessToken =
        accessToken.slice(0, n) +
        accessToken.slice(n + 1, l) +
        accessToken.slice(l + 1, o) +
        accessToken.slice(o + 1, p) +
        accessToken.slice(p + 1, q) +
        accessToken.slice(q + 1);

      const parsedRefreshToken =
        refreshToken.slice(0, i) +
        refreshToken.slice(i + 1, r) +
        refreshToken.slice(r + 1, s) +
        refreshToken.slice(s + 1, t) +
        refreshToken.slice(t + 1, u) +
        refreshToken.slice(u + 1);

      return [parsedAccessToken, parsedRefreshToken];
    } catch (error) {
      console.error("Token parsing failed:", error);
      throw error;
    }
  }
}

// =======================
// PAYLOAD PARSER
// =======================
class PayloadParser {
  private dummyData: number[];
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.dummyData = [
      147, 117, 239, 143, 157, 312, 161, 612, 512, 804, 411, 527, 170, 511, 421, 667, 764, 621, 301, 106, 
      133, 793, 411, 511, 312, 423, 344, 346, 653, 758, 342, 222, 236, 811, 711, 611, 122, 447, 128, 199, 
      183, 135, 489, 703, 800, 745, 152, 863, 134, 211, 142, 564, 375, 793, 212, 153, 138, 153, 648, 611, 
      151, 649, 318, 143, 117, 756, 119, 141, 717, 113, 112, 146, 162, 660, 693, 261, 362, 354, 251, 641, 
      157, 178, 631, 192, 734, 445, 192, 883, 187, 122, 591, 731, 852, 384, 565, 596, 451, 772, 624, 691,
    ];

    this.defaultHeaders = {
      "accept": "application/json, text/plain, */*",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "referer": ROOT_URL,
      "content-type": "application/json",
    };
  }

  private getApiEndpoint(apiKey: string, indexId?: string): { url: string; method: string } {
    const apiConfig = api_dict[apiKey];
    if (!apiConfig) {
      throw new Error(`API configuration not found for key: ${apiKey}`);
    }

    let apiPath = apiConfig.api;
    
    // Handle special case for head_indices_api which needs index ID
    if (apiKey === "head_indices_api" && indexId) {
      apiPath = `${apiPath}/${indexId}`;
    }

    return {
      url: `${ROOT_URL}${apiPath}`,
      method: apiConfig.method
    };
  }

  async returnPayload(
    accessTokenValue: [string, TokenResponse], 
    which?: string,
    apiKey: string = "marketopen_api",
    indexId?: string
  ): Promise<number> {
    try {
      const { url, method } = this.getApiEndpoint(apiKey, indexId);
      
      const headers = {
        ...this.defaultHeaders,
        Authorization: `Salter ${accessTokenValue[0]}`,
      };

      console.log(`Making ${method} request to: ${url}`);

      const fetchOptions: RequestInit = {
        method,
        headers,
      };

      // Add body for POST requests if needed
      if (method === "POST") {
        // You might need to add specific payload data here based on the API requirements
        fetchOptions.body = JSON.stringify({});
      }

      const res = await fetch(url, fetchOptions);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText} for ${url}`);
      }

      const body = await res.json();
      
      if (!body || typeof body !== 'object') {
        throw new Error("Invalid response format from API");
      }

      const givenId: number = body["id"];
      
      if (typeof givenId !== 'number' || givenId < 0) {
        throw new Error(`Invalid or missing 'id' in API response: ${givenId}`);
      }

      const today = new Date().getDate();

      // Safe array access with bounds checking
      const base = givenId < this.dummyData.length ? this.dummyData[givenId] : 0;
      let payloadId = Number(base) + Number(givenId) + 2 * today;

      if (which === "stock-live") {
        return payloadId;
      }

      let indexValue: number;
      if (which === "sector-live") {
        indexValue = payloadId % 10 < 5 ? 3 : 1;
      } else {
        indexValue = payloadId % 10 < 5 ? 1 : 3;
      }

      // Safe salt access with validation
      const saltKey = `salt${indexValue + 1}` as keyof TokenResponse;
      const nextSaltKey = `salt${indexValue}` as keyof TokenResponse;

      if (!(saltKey in accessTokenValue[1]) || !(nextSaltKey in accessTokenValue[1])) {
        throw new Error(`Invalid salt index: ${indexValue}`);
      }

      const nextSalt = accessTokenValue[1][saltKey] as number;
      const prevSalt = accessTokenValue[1][nextSaltKey] as number;

      if (typeof nextSalt !== 'number' || typeof prevSalt !== 'number') {
        throw new Error("Salt values must be numbers");
      }

      payloadId = payloadId + (nextSalt * today) - prevSalt;

      return payloadId;

    } catch (error) {
      console.error("Payload generation failed:", error);
      throw error;
    }
  }

  // Helper method to get API configuration
  getApiConfig(apiKey: string): { api: string; method: string } {
    const config = api_dict[apiKey];
    if (!config) {
      throw new Error(`API configuration not found for key: ${apiKey}`);
    }
    return config;
  }

  // Helper method to list all available APIs
  getAvailableApis(): string[] {
    return Object.keys(api_dict);
  }

  // Helper method to build full URL for an API
  buildApiUrl(apiKey: string, indexId?: string): string {
    const { url } = this.getApiEndpoint(apiKey, indexId);
    return url;
  }
}

// =======================
// NEPSE CLIENT CLASS
// =======================
class NepseClient {
  private tokenParser: TokenParser;
  private payloadParser: PayloadParser;
  private currentTokens: [string, TokenResponse] | null = null;

  constructor() {
    this.tokenParser = new TokenParser();
    this.payloadParser = new PayloadParser();
  }

  // Authenticate and get tokens
  async authenticate(): Promise<[string, TokenResponse]> {
    try {
      const authConfig = this.payloadParser.getApiConfig("authenticate_api");
      const url = `${ROOT_URL}${authConfig.api}`;

      const response = await fetch(url, {
        method: authConfig.method,
        headers: {
          "accept": "application/json, text/plain, */*",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "referer": ROOT_URL,
        }
      });

      if (!response.ok) {
        throw new Error(`Authentication failed: HTTP ${response.status}`);
      }

      const tokenResponse: TokenResponse = await response.json();
      const parsedTokens = this.tokenParser.parseTokenResponse(tokenResponse);
      
      this.currentTokens = [parsedTokens[0], tokenResponse];
      return this.currentTokens;

    } catch (error) {
      console.error("Authentication failed:", error);
      throw error;
    }
  }

  // Make authenticated API calls
  async makeApiCall(apiKey: string, indexId?: string, which?: string): Promise<any> {
    if (!this.currentTokens) {
      console.log("No current tokens, authenticating...");
      await this.authenticate();
    }

    if (!this.currentTokens) {
      throw new Error("Failed to obtain authentication tokens");
    }

    try {
      const config = this.payloadParser.getApiConfig(apiKey);
      let url = `${ROOT_URL}${config.api}`;
      
      // Handle special case for head_indices_api
      if (apiKey === "head_indices_api" && indexId) {
        url = `${url}/${indexId}`;
      }

      const headers = {
        "accept": "application/json, text/plain, */*",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "referer": ROOT_URL,
        "content-type": "application/json",
        Authorization: `Salter ${this.currentTokens[0]}`,
      };

      const fetchOptions: RequestInit = {
        method: config.method,
        headers,
      };

      // For APIs that might need payload ID
      if (["today_price_api", "indices_live_api", "broker_api", "ticker_info_api"].includes(apiKey)) {
        const payloadId = await this.payloadParser.returnPayload(this.currentTokens, which, "marketopen_api", indexId);
        
        if (config.method === "POST") {
          fetchOptions.body = JSON.stringify({ id: payloadId });
        }
      }

      console.log(`Making ${config.method} request to: ${url}`);
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        throw new Error(`API call failed: HTTP ${response.status} for ${apiKey}`);
      }

      return await response.json();

    } catch (error) {
      console.error(`API call failed for ${apiKey}:`, error);
      throw error;
    }
  }

  // Convenience methods for common operations
  async getTodayPrice(which?: string): Promise<any> {
    return this.makeApiCall("today_price_api", undefined, which);
  }

  async getMarketSummary(): Promise<any> {
    return this.makeApiCall("market_summary_api");
  }

  async getTopGainers(): Promise<any> {
    return this.makeApiCall("top_gainer");
  }

  async getTopLosers(): Promise<any> {
    return this.makeApiCall("top_loser");
  }

  async getSectorwiseSummary(): Promise<any> {
    return this.makeApiCall("sectorwise_summary_api");
  }

  async getIndexHistory(indexId: string): Promise<any> {
    return this.makeApiCall("head_indices_api", indexId);
  }

  async getStockLive(): Promise<any> {
    return this.makeApiCall("stock_live_api", undefined, "stock-live");
  }

  async getIndicesLive(): Promise<any> {
    return this.makeApiCall("indices_live_api", undefined, "sector-live");
  }

  // Get list of available APIs
  getAvailableApis(): string[] {
    return this.payloadParser.getAvailableApis();
  }
}

// =======================
// EXPORTS
// =======================
export { TokenParser, PayloadParser, NepseClient };

// Create and export default instance
const nepseClient = new NepseClient();
export default nepseClient;

// Example usage (commented out)

(async function example() {
  try {
    // Authenticate first
    await nepseClient.authenticate();
    
    // Get market data
    const marketSummary = await nepseClient.getMarketSummary();
    console.log("Market Summary:", marketSummary);
    
    // Get top gainers
    const topGainers = await nepseClient.getTopGainers();
    console.log("Top Gainers:", topGainers);
    
    // Get index history (example with index ID 51)
    const indexHistory = await nepseClient.getIndexHistory("51");
    console.log("Index History:", indexHistory);
    
  } catch (error) {
    console.error("Example failed:", error);
  }
})()
