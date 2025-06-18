import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged, User, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";

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

export interface CryptoBalance {
  symbol: string;
  name: string;
  balance: number;
  icon: string;
}

// Predefined cryptocurrencies that all users will have
export const DEFAULT_CRYPTO_BALANCES: CryptoBalance[] = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0,
    icon: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png'
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 0,
    icon: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png'
  },
  {
    symbol: 'USDT',
    name: 'Tether',
    balance: 0,
    icon: 'https://assets.coingecko.com/coins/images/325/large/Tether.png'
  },
  {
    symbol: 'BNB',
    name: 'BNB',
    balance: 0,
    icon: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png'
  },
  {
    symbol: 'XRP',
    name: 'XRP',
    balance: 0,
    icon: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png'
  }
];

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
  cryptoBalances: CryptoBalance[];
}

// Auth functions
export const signInWithGoogle = async () => {
  console.log('Starting Google Sign-In with redirect...');
  console.log('Current domain:', window.location.origin);
  console.log('Auth state:', auth.currentUser);
  console.log('Provider config:', googleProvider);
  console.log('Firebase config domain:', firebaseConfig.authDomain);

  try {
    console.log('Calling signInWithRedirect...');
    console.log('Using auth instance:', auth);
    console.log('Using provider:', googleProvider);

    await signInWithRedirect(auth, googleProvider);
    console.log('signInWithRedirect call completed - redirect should happen now');
    // The page will redirect, so we don't return anything here
  } catch (error: any) {
    console.error("Error starting Google Sign-In redirect:", error);
    console.error("Full error object:", error);
    if (error?.code) console.error("Error code:", error.code);
    if (error?.message) console.error("Error message:", error.message);
    if (error?.stack) console.error("Error stack:", error.stack);

    // Check for common redirect issues
    if (error?.code === 'auth/unauthorized-domain') {
      console.error('Domain not authorized. Current domain:', window.location.origin);
      console.error('Add your domain to Firebase console authorized domains.');
      console.error('Firebase project:', firebaseConfig.projectId);
    } else if (error?.code === 'auth/operation-not-allowed') {
      console.error('Google sign-in not enabled in Firebase console.');
      console.error('Check Authentication > Sign-in method in Firebase console');
    } else if (error?.code === 'auth/invalid-api-key') {
      console.error('Invalid API key in Firebase config');
    }

    throw error;
  }
};

export const handleRedirectResult = async () => {
  console.log('Checking for redirect result...');
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      console.log('Redirect sign-in successful:', result);
      const user = result.user;

      // Try to create or update user profile in Firestore
      try {
        await createOrUpdateUserProfile(user);
      } catch (firestoreError) {
        console.log("Firestore access limited, using Firebase Auth data only");
      }

      return user;
    }
    return null;
  } catch (error: any) {
    console.error("Error handling redirect result:", error);
    if (error?.code) console.error("Error code:", error.code);
    if (error?.message) console.error("Error message:", error.message);
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

// Email/Password authentication functions
export const createEmailPasswordAccount = async (email: string, password: string) => {
  try {
    console.log('Creating account with email:', email);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Send email verification
    await sendEmailVerification(user);
    console.log('Verification email sent');

    // Create user profile in Firestore
    await createOrUpdateUserProfile(user);

    return user;
  } catch (error: any) {
    console.error("Error creating account:", error);

    let errorMessage = 'Failed to create account';
    if (error?.code === 'auth/email-already-in-use') {
      errorMessage = 'An account with this email already exists';
    } else if (error?.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error?.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak';
    } else if (error?.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    console.log('Signing in with email:', email);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Update user profile in Firestore
    await createOrUpdateUserProfile(user);

    return user;
  } catch (error: any) {
    console.error("Error signing in:", error);

    let errorMessage = 'Failed to sign in';
    if (error?.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    } else if (error?.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error?.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error?.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later';
    } else if (error?.message) {
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

export const sendVerificationEmail = async (user: User) => {
  try {
    await sendEmailVerification(user);
    console.log('Verification email sent to:', user.email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw error;
  }
};

export const resendVerificationEmail = async () => {
  try {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
      console.log('Verification email resent to:', user.email);
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error resending verification email:", error);
    throw error;
  }
};

// Generate consistent 9-digit numeric UID
export const generateNumericUID = () => {
  return Math.floor(100000000 + Math.random() * 900000000).toString();
};

// Firestore functions
export const createOrUpdateUserProfile = async (user: User) => {
  try {
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    const now = Date.now();

    if (!userSnap.exists()) {
      // Create new user profile with 9-digit numeric UID and default crypto balances
      const numericUID = generateNumericUID();
      const userProfile: UserProfile = {
        uid: numericUID,
        email: user.email || '',
        displayName: user.displayName || 'Anonymous User',
        photoURL: user.photoURL || '',
        createdAt: now,
        lastLoginAt: now,
        vipLevel: 'Regular User',
        following: 0,
        followers: 0,
        portfolioBalance: 0,
        cryptoBalances: [...DEFAULT_CRYPTO_BALANCES]
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
    console.warn("Firestore access limited, using Firebase Auth data only:", error);
    // Don't throw error - continue with fallback profile
    return {
      uid: generateNumericUID(),
      email: user.email || '',
      displayName: user.displayName || 'Anonymous User',
      photoURL: user.photoURL || '',
      createdAt: Date.now(),
      lastLoginAt: Date.now(),
      vipLevel: 'Regular User',
      following: 0,
      followers: 0,
      portfolioBalance: 0,
      cryptoBalances: [...DEFAULT_CRYPTO_BALANCES]
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

// Real-time user profile listener
export const onUserProfileChange = (uid: string, callback: (profile: UserProfile | null) => void) => {
  const userRef = doc(db, 'users', uid);
  return onSnapshot(userRef, (doc) => {
    if (doc.exists()) {
      const profile = doc.data() as UserProfile;
      callback(profile);
    } else {
      callback(null);
    }
  }, (error) => {
    console.warn("Firestore listener error (using fallback):", error);
    // Don't call callback(null) as it would clear the profile
    // Let the app continue with existing profile data
  });
};

// Update user crypto balance
export const updateUserCryptoBalance = async (uid: string, symbol: string, newBalance: number) => {
  try {
    const userRef = doc(db, 'users', uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const userData = userSnap.data() as UserProfile;
      const updatedBalances = userData.cryptoBalances.map(crypto => 
        crypto.symbol === symbol 
          ? { ...crypto, balance: newBalance }
          : crypto
      );

      await updateDoc(userRef, {
        cryptoBalances: updatedBalances
      });

      return true;
    }
    return false;
  } catch (error) {
    console.error("Error updating crypto balance:", error);
    return false;
  }
};