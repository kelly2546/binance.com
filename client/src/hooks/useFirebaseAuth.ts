import { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  auth, 
  signInWithGoogle, 
  signOutUser, 
  onAuthStateChange, 
  getUserProfile,
  UserProfile 
} from '@/lib/firebase';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (firebaseUser) => {
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
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    console.log('useFirebaseAuth: login() called');
    try {
      setError(null);
      setLoading(true);
      console.log('useFirebaseAuth: Starting signInWithGoogle...');
      const user = await signInWithGoogle();
      console.log('useFirebaseAuth: signInWithGoogle completed, user:', user);
      
      // Try to get profile, but don't fail if Firestore is not accessible
      try {
        const profile = await getUserProfile(user.uid);
        if (profile) {
          setUserProfile(profile);
          console.log('useFirebaseAuth: Profile loaded from Firestore');
        } else {
          // Use Firebase Auth data directly
          const authProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || 'Anonymous User',
            photoURL: user.photoURL || '',
            createdAt: Date.now(),
            lastLoginAt: Date.now(),
            vipLevel: 'Regular User',
            following: 0,
            followers: 0,
            portfolioBalance: 0
          };
          setUserProfile(authProfile);
          console.log('useFirebaseAuth: Using fallback profile from Firebase Auth');
        }
      } catch (profileErr) {
        // Fallback to Firebase Auth data if Firestore fails
        const authProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Anonymous User',
          photoURL: user.photoURL || '',
          createdAt: Date.now(),
          lastLoginAt: Date.now(),
          vipLevel: 'Regular User',
          following: 0,
          followers: 0,
          portfolioBalance: 0
        };
        setUserProfile(authProfile);
        console.log('useFirebaseAuth: Error with Firestore, using fallback profile');
      }
    } catch (err: any) {
      console.error('useFirebaseAuth: Login failed with error:', err);
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
      console.log('useFirebaseAuth: Login process completed');
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