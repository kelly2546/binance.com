import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Simple auth endpoint for testing
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // For now, return a simple test user
      const testUser = {
        uid: 'test-user-123',
        email: 'test@example.com',
        displayName: 'Test User',
        photoURL: 'https://api.dicebear.com/7.x/avataaars/svg?seed=test',
        cryptoBalances: [
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            balance: 0.00012345,
            icon: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
          },
          {
            symbol: 'ETH',
            name: 'Ethereum',
            balance: 0.0543,
            icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
          }
        ]
      };
      res.json(testUser);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User holdings route
  app.get('/api/user/holdings', async (req: any, res) => {
    try {
      const holdings = [
        {
          symbol: 'BTC',
          name: 'Bitcoin',
          balance: 0.00012345,
          icon: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
        },
        {
          symbol: 'ETH',
          name: 'Ethereum',
          balance: 0.0543,
          icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
        }
      ];
      res.json(holdings);
    } catch (error) {
      console.error("Error fetching user holdings:", error);
      res.status(500).json({ message: "Failed to fetch holdings" });
    }
  });
  // Get cryptocurrency data from CoinGecko API
  app.get("/api/crypto", async (req, res) => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false",
        {
          headers: {
            'Accept': 'application/json',
            'User-Agent': 'CryptoTradingApp/1.0'
          }
        }
      );
      
      if (!response.ok) {
        if (response.status === 429) {
          console.log("CoinGecko rate limit reached, implementing delay");
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        throw new Error(`CoinGecko API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Transform the data to match our schema
      const cryptoData = data.map((coin: any) => ({
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        current_price: coin.current_price.toString(),
        price_change_percentage_24h: coin.price_change_percentage_24h?.toFixed(2) || "0.00",
        market_cap: coin.market_cap.toString(),
        total_volume: coin.total_volume?.toString() || "0",
        image: coin.image,
      }));
      
      res.json(cryptoData);
    } catch (error) {
      console.error("Error fetching crypto data:", error);
      res.status(500).json({ 
        error: "Failed to fetch cryptocurrency data",
        message: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Get cryptocurrency news from NewsAPI
  app.get("/api/news", async (req, res) => {
    try {
      // Using NewsAPI free tier for cryptocurrency news
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=cryptocurrency+OR+bitcoin+OR+blockchain&sortBy=publishedAt&pageSize=5&language=en&apiKey=${process.env.NEWS_API_KEY || 'demo'}`
      );
      
      if (!response.ok) {
        // If NewsAPI fails, use CoinDesk RSS as fallback
        const fallbackNews = [
          {
            id: 1,
            title: "Bitcoin Market Analysis: Current Trends and Future Outlook",
            url: "https://www.coindesk.com/markets/",
            publishedAt: new Date().toISOString()
          },
          {
            id: 2,
            title: "Ethereum Updates: Network Developments and Price Movement",
            url: "https://www.coindesk.com/tech/",
            publishedAt: new Date(Date.now() - 3600000).toISOString()
          },
          {
            id: 3,
            title: "Cryptocurrency Regulation: Latest Policy Updates",
            url: "https://www.coindesk.com/policy/",
            publishedAt: new Date(Date.now() - 7200000).toISOString()
          },
          {
            id: 4,
            title: "DeFi Market Insights: Trends and Opportunities",
            url: "https://www.coindesk.com/business/",
            publishedAt: new Date(Date.now() - 10800000).toISOString()
          }
        ];
        return res.json(fallbackNews);
      }
      
      const data = await response.json();
      
      if (data.articles) {
        const newsData = data.articles.slice(0, 4).map((article: any, index: number) => ({
          id: index + 1,
          title: article.title,
          url: article.url,
          publishedAt: article.publishedAt
        }));
        res.json(newsData);
      } else {
        throw new Error('No articles found');
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      
      // Provide fallback news content
      const fallbackNews = [
        {
          id: 1,
          title: "Cryptocurrency Market Shows Continued Growth",
          url: "#",
          publishedAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Blockchain Technology Adoption Increases Across Industries",
          url: "#",
          publishedAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: 3,
          title: "Digital Asset Investment Trends for 2025",
          url: "#",
          publishedAt: new Date(Date.now() - 7200000).toISOString()
        },
        {
          id: 4,
          title: "Security Best Practices for Cryptocurrency Trading",
          url: "#",
          publishedAt: new Date(Date.now() - 10800000).toISOString()
        }
      ];
      
      res.json(fallbackNews);
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
