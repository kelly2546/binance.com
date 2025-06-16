import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

interface CryptoBalance {
  symbol: string;
  name: string;
  balance: number;
  icon: string;
}

interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  cryptoBalances: CryptoBalance[];
}

export function useMockAuth() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check for stored authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUser = localStorage.getItem('mockUser');
    
    if (isAuthenticated && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('mockUser');
        localStorage.removeItem('isAuthenticated');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email: string) => {
    // Generate a 9-digit numeric UID similar to 799181588
    const generateNumericUID = () => {
      return Math.floor(100000000 + Math.random() * 900000000).toString();
    };

    const mockUser = {
      uid: generateNumericUID(),
      email: email,
      displayName: email.split('@')[0] || 'Demo User',
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
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
    
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    localStorage.setItem('isAuthenticated', 'true');
    
    setUser(mockUser);
    setLocation('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('mockUser');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    setLocation('/');
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
  };
}