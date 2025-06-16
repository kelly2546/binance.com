import {
  users,
  userHoldings,
  cryptocurrencies,
  type User,
  type InsertUser,
  type UpsertUser,
  type UserHolding,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserHoldings(userId: number): Promise<UserHolding[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(uid: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.uid, uid));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        uid: userData.uid!,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        profileImageUrl: userData.profileImageUrl,
        username: userData.email || `user_${userData.uid}`,
        password: 'oauth_user', // placeholder for OAuth users
      })
      .onConflictDoUpdate({
        target: users.uid,
        set: {
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          profileImageUrl: userData.profileImageUrl,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserHoldings(userId: number): Promise<UserHolding[]> {
    return await db.select().from(userHoldings).where(eq(userHoldings.userId, userId));
  }
}

export const storage = new DatabaseStorage();
