export default function handler(req, res) {
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
    // Static crypto data for Vercel serverless compatibility
    const cryptoData = [
      {
        id: "bitcoin",
        symbol: "BTC", 
        name: "Bitcoin",
        current_price: 106127,
        price_change_percentage_24h: -0.8,
        image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png"
      },
      {
        id: "ethereum",
        symbol: "ETH",
        name: "Ethereum", 
        current_price: 3985,
        price_change_percentage_24h: 1.2,
        image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png"
      }
    ];
    res.status(200).json(cryptoData);
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