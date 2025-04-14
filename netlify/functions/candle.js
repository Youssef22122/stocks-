
import fetch from 'node-fetch';

export async function handler(event, context) {
  const symbol = event.queryStringParameters.symbol;
  if (!symbol) return { statusCode: 400, body: "Missing symbol" };

  const API_KEY = "AK8YD647KME4FBKKX47I";
  const SECRET_KEY = "etbpfBCfTBTbs1AVlqmF7x1hBXnc8ikvyY5r0iMh";
  const url = `https://data.alpaca.markets/v2/stocks/${symbol}/bars?timeframe=1Min&limit=2`;

  try {
    const res = await fetch(url, {
      headers: {
        'APCA-API-KEY-ID': API_KEY,
        'APCA-API-SECRET-KEY': SECRET_KEY
      }
    });
    const data = await res.json();
    return { statusCode: 200, body: JSON.stringify(data.bars) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
