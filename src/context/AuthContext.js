import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setCurrentUser(result.user);

       if (result.user.email.endsWith("@gmail.com")) {
         setUserRole("Both");
       } else if (result.user.email === "admin@example.com") {
         setUserRole("Admin");
       } else {
         setUserRole("Staff");
       }

      return result.user; 
    } catch (error) {
      console.error("Google login error:", error);
      throw error; 
    }
  };

  const logout = async () => {
    await auth.signOut();
    setCurrentUser(null);
    setUserRole(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, userRole, loginWithGoogle, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
