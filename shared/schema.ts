import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table.
// (IMPORTANT) This table is mandatory for Replit Auth, don't drop it.
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Cryptocurrency data schema
export const CryptocurrencySchema = z.object({
  id: z.string(),
  symbol: z.string(),
  name: z.string(),
  image: z.string(),
  current_price: z.union([z.number(), z.string()]).transform(val => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  market_cap: z.union([z.number(), z.string()]).transform(val => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  price_change_percentage_24h: z.union([z.number(), z.string()]).transform(val => 
    typeof val === 'string' ? parseFloat(val) : val
  ),
  total_volume: z.union([z.number(), z.string()]).transform(val => 
    typeof val === 'string' ? parseFloat(val) : val
  ).optional(),
});

export type Cryptocurrency = z.infer<typeof CryptocurrencySchema>;

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
