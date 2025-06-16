import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXFmXzvL4XFzYF6couM_oVEolxcw_gBeg",
  authDomain: "binance-34370.firebaseapp.com",
  projectId: "binance-34370",
  storageBucket: "binance-34370.firebasestorage.app",
  messagingSenderId: "1042272185249",
  appId: "1:1042272185249:web:9a9532b6d660d42ad1b9e0",
  measurementId: "G-W6QFS65N0N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Configure Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: number;
  lastLoginAt: number;
  vipLevel: string;
  following: number;
  followers: number;
  portfolioBalance: number;
}

// Auth functions
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Try to create or update user profile in Firestore
    try {
      await createOrUpdateUserProfile(user);
    } catch (firestoreError) {
      console.log("Firestore access limited, using Firebase Auth data only");
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Firestore functions
export const createOrUpdateUserProfile = async (user: User) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    const now = Date.now();
    
    if (!userSnap.exists()) {
      // Create new user profile
      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Anonymous User',
        photoURL: user.photoURL || '',
        createdAt: now,
        lastLoginAt: now,
        vipLevel: 'Regular User',
        following: 0,
        followers: 0,
        portfolioBalance: 0
      };
      
      await setDoc(userRef, userProfile);
      return userProfile;
    } else {
      // Update existing user's last login
      await updateDoc(userRef, {
        lastLoginAt: now,
        email: user.email || userSnap.data().email,
        displayName: user.displayName || userSnap.data().displayName,
        photoURL: user.photoURL || userSnap.data().photoURL
      });
      
      return userSnap.data() as UserProfile;
    }
  } catch (error) {
    console.error("Error creating/updating user profile:", error);
    // Return a basic profile using Firebase user data if Firestore fails
    return {
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
    } as UserProfile;
  }
};

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);
    
    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    // Return null to gracefully handle permissions error
    return null;
  }
};

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};