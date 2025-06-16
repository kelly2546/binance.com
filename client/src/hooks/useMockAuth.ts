import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

interface MockUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
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
    const mockUser = {
      uid: 'demo-user-' + Date.now(),
      email: email,
      displayName: email.split('@')[0] || 'Demo User',
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
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