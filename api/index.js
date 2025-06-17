import express from 'express';

const app = express();

app.use(express.json());

// Crypto data endpoint
app.get('/api/crypto', async (req, res) => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch crypto data' });
  }
});

// News data endpoint  
app.get('/api/news', async (req, res) => {
  const newsData = [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High Above $98,000",
      description: "Cryptocurrency markets surge as institutional adoption continues to grow.",
      url: "#",
      publishedAt: new Date().toISOString(),
      source: { name: "Crypto News" }
    },
    {
      id: 2,
      title: "Ethereum 2.0 Staking Rewards Increase", 
      description: "Network validators see improved returns as more users participate in staking.",
      url: "#",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { name: "Blockchain Today" }
    }
  ];
  
  res.json(newsData);
});

export default app;