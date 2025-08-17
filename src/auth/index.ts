import fs from "fs";
import path from "path";
import { TokenParser } from "./TokenParser.js";

async function loadWasm() {
  const wasmPath = path.resolve("./src/auth/nepse.wasm");
  const buffer = fs.readFileSync(wasmPath);
  const module = await WebAssembly.instantiate(new Uint8Array(buffer));
  return module.instance.exports;
}

async function main() {
  const exports = await loadWasm();
  const parser = new TokenParser(exports);

  const tokenResponse = {
    salt1: 2,
    salt2: 5,
    salt3: 7,
    salt4: 11,
    salt5: 13,
    accessToken: "abcdef1234567890",
    refreshToken: "uvwxyz9876543210",
  };

  const { parsedAccessToken, parsedRefreshToken } = parser.parseTokenResponse(tokenResponse);

  console.log("Access:", parsedAccessToken);
  console.log("Refresh:", parsedRefreshToken);
}

main();