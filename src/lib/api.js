/**
 * API Service for fetching market data
 */
const API_KEY = import.meta.env.VITE_MARKET_KEY;
const BASE_URL = import.meta.env.VITE_MARKET_URL;

const getMarketPrice = async (symbol) => {
  if (!symbol) return { success: false, error: "Symbol required" };

  try {
    const response = await fetch(
      `${BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol.toUpperCase()}&apikey=${API_KEY}`
    );
    const data = await response.json();

    const quote = data["Global Quote"];
    
    if (quote && quote["05. price"]) {
      return { success: true, price: parseFloat(quote["05. price"]) };
    } else {
      return { success: false, error: "Price not found. Use symbol.NSE (e.g., TATAMOTORS.NSE)" };
    }
  } catch (error) {
    return { success: false, error: "Service unavailable" };
  }
};

const searchSymbols = async (query) => {
  if (!query || query.length < 2) return { success: true, result: [] };

  try {
    const response = await fetch(
      `${BASE_URL}?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
    );
    const data = await response.json();

    const results = (data.bestMatches || []).map(item => ({
      symbol: item["1. symbol"],
      description: item["2. name"]
    }));

    return { success: true, result: results };
  } catch (error) {
    return { success: false, result: [] };
  }
};

export { getMarketPrice, searchSymbols };