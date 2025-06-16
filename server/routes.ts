import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Test user route (for demo purposes)
  app.get('/api/auth/test-user', async (req, res) => {
    res.json({
      id: 1,
      uid: "demo_user",
      username: "mr_crypto_",
      email: "demo@example.com",
      firstName: "Mr",
      lastName: "Crypto",
      profileImageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=crypto",
      vipLevel: "Regular User",
      following: 14,
      followers: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  });

  // User holdings route
  app.get('/api/user/holdings', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const holdings = await storage.getUserHoldings(user.id);
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
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      );
      
      if (!response.ok) {
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

  // Get news data (static for now as per requirements)
  app.get("/api/news", async (req, res) => {
    const newsData = [
      {
        id: 1,
        title: "Digital Assets Show Resilience Amid Geopolitical Concerns",
        url: "#"
      },
      {
        id: 2,
        title: "Cryptocurrency Investment Products See Continued Inflows Amid Market Gains",
        url: "#"
      },
      {
        id: 3,
        title: "Swedish Medical Firm Secures Convertible Loan for Bitcoin Investment",
        url: "#"
      },
      {
        id: 4,
        title: "Japan's Tax Reforms Influence Bitcoin Holdings Strategy",
        url: "#"
      }
    ];
    
    res.json(newsData);
  });

  const httpServer = createServer(app);
  return httpServer;
}
