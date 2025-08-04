import { useRouter } from "expo-router";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { auth, firestore } from "../config/firebase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          userName: firebaseUser.displayName ?? null,
          image: firebaseUser.photoURL ?? null,
        };

        setUser(userData);

        const docSnap = await getDoc(doc(firestore, "users", firebaseUser.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser((prev) => ({
            ...prev,
            userName: data.userName || prev.userName,
            image: data.image || prev.image,
            createdAt: data.createdAt || null,
          }));
        }

        router.replace("./(tabs)/home");
      } else {
        setUser(null);
        router.replace("/welcome");
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

  const register = async (email, password, userName) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: userName,
      });

      await setDoc(doc(firestore, "users", res.user.uid), {
        userName,
        email,
        uid: res.user.uid,
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

  const refreshUserData = async (uid) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData = {
          uid: data?.uid,
          email: data?.email,
          userName: data?.userName,
          image: data?.image,
          createdAt: data?.createdAt,
        };

        setUser({ ...userData });
      }
    } catch (error) {
      const msg = error.message
        .replace("Firebase:", "")
        .replace("auth/", "")
        .replace(/-/g, " ")
        .trim();
      // return { success: false, msg };
      console.log(msg);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

  const contextValue = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      refreshUserData,
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
