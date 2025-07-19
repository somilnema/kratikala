// app/context/login.ts

"use client";

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface UserInfo {
  fullName: string;
  email: string;
}

type LoginContextType = {
  isLoggedIn: boolean;
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export function LoginProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    // Initialize from localStorage
    const stored = localStorage.getItem("isLoggedIn");
    const storedUser = localStorage.getItem("userInfo");
    setIsLoggedIn(stored === "true");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, []);

  const login = (userInfo: UserInfo) => {
    setIsLoggedIn(true);
    setUser(userInfo);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLogin() {
  const context = useContext(LoginContext);
  if (context === undefined) {
    throw new Error("useLogin must be used within a LoginProvider");
  }
  return context;
}