import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange, 
  getUserProfile,
  onUserProfileChange,
  UserProfile,
  handleRedirectResult,
  DEFAULT_CRYPTO_BALANCES
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

    let profileUnsubscribe: (() => void) | null = null;

    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
      const wasUnauthenticated = !user;
      setUser(firebaseUser);
      
      // Clean up previous profile listener
      if (profileUnsubscribe) {
        profileUnsubscribe();
        profileUnsubscribe = null;
      }
      
      if (firebaseUser) {
        // Set up real-time profile listener
        profileUnsubscribe = onUserProfileChange(firebaseUser.uid, (profile) => {
          if (profile) {
            setUserProfile(profile);
          } else {
            // Fallback profile if no Firestore data exists
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
              portfolioBalance: 0,
              cryptoBalances: [...DEFAULT_CRYPTO_BALANCES]
            };
            setUserProfile(fallbackProfile);
          }
        });
        
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
    return () => {
      unsubscribe();
      if (profileUnsubscribe) {
        profileUnsubscribe();
      }
    };
  }, [setLocation]);

  const login = async () => {
    console.log('useFirebaseAuth: login() called');
    console.log('Current URL:', window.location.href);
    console.log('Firebase auth instance:', auth);
    console.log('Current user before login:', auth.currentUser);
    
    try {
      setError(null);
      setLoading(true);
      console.log('useFirebaseAuth: Starting signInWithGoogle redirect...');
      console.log('About to call signInWithGoogle()');
      await signInWithGoogle();
      // The page will redirect, so we don't need to handle the result here
      console.log('useFirebaseAuth: Redirect initiated - this should not be reached if redirect works');
    } catch (err: any) {
      console.error('useFirebaseAuth: Login failed with error:', err);
      console.error('Error code:', err?.code);
      console.error('Error message:', err?.message);
      console.error('Full error object:', err);
      
      let errorMessage = 'Login failed';
      if (err?.code === 'auth/unauthorized-domain') {
        errorMessage = 'Domain not authorized for Firebase authentication. Check Firebase console authorized domains.';
      } else if (err?.code === 'auth/operation-not-allowed') {
        errorMessage = 'Google sign-in not enabled in Firebase console';
      } else if (err?.code === 'auth/popup-blocked') {
        errorMessage = 'Popup was blocked by browser';
      } else if (err?.code === 'auth/cancelled-popup-request') {
        errorMessage = 'Another popup request was cancelled';
      } else if (err?.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      setLoading(false);
      alert(`Authentication Error: ${errorMessage}`);
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