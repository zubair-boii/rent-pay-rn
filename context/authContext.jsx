import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, firestore } from "../config/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("firebase user: ", firebaseUser);

      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          userName: firebaseUser.displayName,
          image: firebaseUser.photoURL,
        };
        setUser(userData);

        if (router.pathname !== "/home") {
          router.replace("/home");
        }
      } else {
        setUser(null);

        if (router.pathname !== "/welcome") {
          router.replace("/welcome");
        }
      }
    });

    return () => unsub();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      const msg = error.message
        .replace("Firebase:", "")
        .replace("auth/", "")
        .replace(/-/g, " ")
        .trim();
      return { success: false, msg };
    }
  };

  const register = async (email, password, username) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(firestore, "users", response.user.uid), {
        username,
        email,
        uid: response.user.uid,
        createdAt: serverTimestamp(),
      });

      return { success: true };
    } catch (error) {
      const msg = error.message
        .replace("Firebase:", "")
        .replace("auth/", "")
        .replace(/-/g, " ")
        .trim();
      return { success: false, msg };
    }
  };

  const updateUserData = async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData = {
          username: data.username,
          email: data.email || null,
          uid: data.uid || null,
          createdAt: data.createdAt || null,
          image: data.image || null,
        };
        setUser(userData);
      }
    } catch (error) {
      console.log("updateUserData error:", error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("logout error:", error.message);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      login,
      register,
      updateUserData,
      logout,
    }),
    [user]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
