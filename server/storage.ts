// Simple in-memory storage for Firebase authentication
interface CryptoBalance {
  symbol: string;
  name: string;
  balance: number;
  icon: string;
}

interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  cryptoBalances: CryptoBalance[];
}

// Interface for storage operations
export interface IStorage {
  getUser(id: string): Promise<UserProfile | undefined>;
  getUserByUsername(username: string): Promise<UserProfile | undefined>;
  createUser(user: Partial<UserProfile>): Promise<UserProfile>;
  upsertUser(user: Partial<UserProfile>): Promise<UserProfile>;
  getUserHoldings(userId: string): Promise<CryptoBalance[]>;
}

// In-memory storage implementation
const users = new Map<string, UserProfile>();

export class MemStorage implements IStorage {
  async getUser(uid: string): Promise<UserProfile | undefined> {
    return users.get(uid);
  }

  async getUserByUsername(username: string): Promise<UserProfile | undefined> {
    const userArray = Array.from(users.values());
    return userArray.find(user => user.email === username);
  }

  async createUser(userData: Partial<UserProfile>): Promise<UserProfile> {
    const user: UserProfile = {
      uid: userData.uid!,
      email: userData.email || '',
      displayName: userData.displayName || 'User',
      photoURL: userData.photoURL,
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
        },
        {
          symbol: 'USDT',
          name: 'Tether',
          balance: 125.50,
          icon: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
        },
        {
          symbol: 'BNB',
          name: 'BNB',
          balance: 0.25,
          icon: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
        }
      ]
    };
    
    users.set(user.uid, user);
    return user;
  }

  async upsertUser(userData: Partial<UserProfile>): Promise<UserProfile> {
    const existingUser = users.get(userData.uid!);
    
    if (existingUser) {
      const updatedUser = { ...existingUser, ...userData };
      users.set(userData.uid!, updatedUser);
      return updatedUser;
    } else {
      return this.createUser(userData);
    }
  }

  async getUserHoldings(userId: string): Promise<CryptoBalance[]> {
    const user = users.get(userId);
    return user?.cryptoBalances || [];
  }
}

export const storage = new MemStorage();