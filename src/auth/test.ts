import { PayloadParser, TokenParser } from "./index";

// Create instances
const tokenParser = new TokenParser();
const payloadParser = new PayloadParser();

// Log the parser objects themselves
console.log("TokenParser instance:", tokenParser);
console.log("PayloadParser instance:", payloadParser);