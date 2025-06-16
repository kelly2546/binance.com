import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange, 
  getUserProfile,
  UserProfile,
  handleRedirectResult
} from '@/lib/firebase';
import { useLocation } from 'wouter';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    const initializeAuth = async () => {
      // Check for redirect result first
      try {
        const redirectUser = await handleRedirectResult();
        if (redirectUser) {
          console.log('Redirect authentication successful, navigating to dashboard');
          setLocation('/dashboard');
        }
      } catch (error) {
        console.error('Error handling redirect result:', error);
      }
    };

    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      const wasUnauthenticated = !user;
      setUser(firebaseUser);
      
      if (firebaseUser) {
        // Try to fetch user profile from Firestore, fallback to Firebase Auth data
        try {
          const profile = await getUserProfile(firebaseUser.uid);
          if (profile) {
            setUserProfile(profile);
          } else {
            // Fallback to creating profile from Firebase Auth data
            const fallbackProfile: UserProfile = {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || 'Anonymous User',
              photoURL: firebaseUser.photoURL || '',
              createdAt: Date.now(),
              lastLoginAt: Date.now(),
              vipLevel: 'Regular User',
              following: 0,
              followers: 0,
              portfolioBalance: 0
            };
            setUserProfile(fallbackProfile);
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          // Use Firebase Auth data as fallback
          const fallbackProfile: UserProfile = {
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            displayName: firebaseUser.displayName || 'Anonymous User',
            photoURL: firebaseUser.photoURL || '',
            createdAt: Date.now(),
            lastLoginAt: Date.now(),
            vipLevel: 'Regular User',
            following: 0,
            followers: 0,
            portfolioBalance: 0
          };
          setUserProfile(fallbackProfile);
        }
        
        // Navigate to dashboard if user just authenticated and isn't already there
        if (wasUnauthenticated && window.location.pathname !== '/dashboard') {
          console.log('User authenticated, navigating to dashboard');
          setLocation('/dashboard');
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    initializeAuth();
    return () => unsubscribe();
  }, [setLocation]);

  const login = async () => {
    console.log('useFirebaseAuth: login() called');
    try {
      setError(null);
      setLoading(true);
      console.log('useFirebaseAuth: Starting signInWithGoogle redirect...');
      await signInWithGoogle();
      // The page will redirect, so we don't need to handle the result here
      console.log('useFirebaseAuth: Redirect initiated');
    } catch (err: any) {
      console.error('useFirebaseAuth: Login failed with error:', err);
      console.error('Error code:', err?.code);
      console.error('Error message:', err?.message);
      
      let errorMessage = 'Login failed';
      if (err?.code === 'auth/unauthorized-domain') {
        errorMessage = 'Domain not authorized for Firebase authentication';
      } else if (err?.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google sign-in not enabled in Firebase';
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setError(null);
      await signOutUser();
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      setError(err.message || 'Logout failed');
    }
  };

  return {
    user,
    userProfile,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user
  };
}