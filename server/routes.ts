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

  // Get news data (placeholder - connect to real news API)
  app.get("/api/news", async (req, res) => {
    res.status(503).json({ 
      error: "News service unavailable",
      message: "Please configure a news API service"
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
