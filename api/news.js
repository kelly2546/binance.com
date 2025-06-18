export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const newsData = [
    {
      id: 1,
      title: "Bitcoin Reaches New All-Time High Above $106,000",
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
    },
    {
      id: 3,
      title: "Major Banks Announce Crypto Trading Services",
      description: "Traditional financial institutions expand digital asset offerings.",
      url: "#",
      publishedAt: new Date(Date.now() - 7200000).toISOString(),
      source: { name: "Financial Times" }
    }
  ];
  
  res.status(200).json(newsData);
}