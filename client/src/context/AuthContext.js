import { createContext, useEffect, useState } from "react";
import { auth } from "../config/Firebase";

import User from "firebase";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (currentUser?.uid) {
      sessionStorage.setItem(`${currentUser.uid}`, JSON.stringify(currentUser));
    }
  }, [currentUser]);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
