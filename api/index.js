export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { url } = req;

  if (url.includes('/api/crypto')) {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false');
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch crypto data' });
    }
  } else if (url.includes('/api/news')) {
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
    
    res.status(200).json(newsData);
  } else {
    res.status(404).json({ error: 'API endpoint not found' });
  }
}