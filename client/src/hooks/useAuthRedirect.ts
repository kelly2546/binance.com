import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useFirebaseAuth } from './useFirebaseAuth';

export function useAuthRedirect() {
  const { isAuthenticated, loading } = useFirebaseAuth();
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (!loading) {
      // Redirect authenticated users away from auth pages
      if (isAuthenticated && (location === '/' || location === '/login')) {
        setLocation('/dashboard');
      }
      
      // Redirect unauthenticated users to home from protected pages
      if (!isAuthenticated && location === '/dashboard') {
        setLocation('/');
      }
    }
  }, [isAuthenticated, loading, location, setLocation]);

  return { isAuthenticated, loading };
}