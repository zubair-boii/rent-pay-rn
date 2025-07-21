import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC1yuTa58vj7RkkUxCmsi4sf6Xmf72z0U",
  authDomain: "rentpay-expo.firebaseapp.com",
  projectId: "rentpay-expo",
  storageBucket: "rentpay-expo.appspot.com", // Fixed `.app` to `.com`
  messagingSenderId: "679618070969",
  appId: "1:679618070969:web:d6c19b5c054a109e584e68",
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// database
export const firestore = getFirestore(app);
