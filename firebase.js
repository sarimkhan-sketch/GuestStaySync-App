
import { getApp, initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,

  /*apiKey: "AIzaSyA1RzLGJaZlD12K_GFkNEsP0yyvcTABwdU",
  authDomain: "gueststaysync.firebaseapp.com",
  projectId: "gueststaysync",
  storageBucket: "gueststaysync.firebasestorage.app",
  messagingSenderId: "221606568249",
  appId: "1:221606568249:web:658ad0e7c4bed73fa048e8",
  measurementId: "G-MQ15EQRF57"*/
};

console.log("Firebase Key:", process.env.EXPO_PUBLIC_FIREBASE_API_KEY ? "LOADED ✅" : "MISSING ❌");

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export {auth,db};

/*import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};

// 1. Check if an app is already initialized to prevent "duplicate app" errors
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Specialized Auth for React Native (Prevents the "not registered" error)
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { app, auth };*/