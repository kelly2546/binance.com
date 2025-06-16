import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  uid: text("uid").unique(),
  email: text("email"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImageUrl: text("profile_image_url"),
  vipLevel: text("vip_level").default("Regular User"),
  following: integer("following").default(0),
  followers: integer("followers").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

export const userHoldings = pgTable("user_holdings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  cryptoId: text("crypto_id").references(() => cryptocurrencies.id),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  avgBuyPrice: decimal("avg_buy_price", { precision: 20, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const sessions = pgTable("sessions", {
  sid: text("sid").primaryKey(),
  sess: text("sess").notNull(),
  expire: timestamp("expire").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const upsertUserSchema = createInsertSchema(users).pick({
  uid: true,
  email: true,  
  firstName: true,
  lastName: true,
  profileImageUrl: true,
});

export const insertCryptocurrencySchema = createInsertSchema(cryptocurrencies).omit({
  last_updated: true,
});

export const insertUserHoldingSchema = createInsertSchema(userHoldings).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;
export type Cryptocurrency = typeof cryptocurrencies.$inferSelect;
export type UserHolding = typeof userHoldings.$inferSelect;
export type InsertCryptocurrency = z.infer<typeof insertCryptocurrencySchema>;
export type InsertUserHolding = z.infer<typeof insertUserHoldingSchema>;

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
