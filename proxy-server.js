const express = require("express");
const fetch   = require("node-fetch");
const app     = express();

const API_KEY  = "c2900e315c448fcbef082442967606b4";
const API_BASE = "https://v3.football.api-sports.io";
const PORT     = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.get("/api/*", async (req, res) => {
  const path = req.url.replace("/api", "");
  try {
    const upstream = await fetch(`${API_BASE}${path}`, {
      headers: { "x-apisports-key": API_KEY },
    });
    const data = await upstream.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
