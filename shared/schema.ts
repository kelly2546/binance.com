import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const cryptocurrencies = pgTable("cryptocurrencies", {
  id: text("id").primaryKey(), // coinGecko ID
  symbol: text("symbol").notNull(),
  name: text("name").notNull(),
  current_price: decimal("current_price", { precision: 20, scale: 8 }),
  price_change_percentage_24h: decimal("price_change_percentage_24h", { precision: 10, scale: 4 }),
  market_cap: decimal("market_cap", { precision: 20, scale: 2 }),
  image: text("image"),
  last_updated: timestamp("last_updated").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCryptocurrencySchema = createInsertSchema(cryptocurrencies).omit({
  last_updated: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Cryptocurrency = typeof cryptocurrencies.$inferSelect;
export type InsertCryptocurrency = z.infer<typeof insertCryptocurrencySchema>;

// CoinGecko API response types
export const CoinGeckoApiResponse = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.number(),
  market_cap: z.number(),
  price_change_percentage_24h: z.number(),
});

export type CoinGeckoApiResponseType = z.infer<typeof CoinGeckoApiResponse>;
