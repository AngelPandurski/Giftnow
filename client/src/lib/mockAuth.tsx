/** Mock auth – провайдър за localStorage потребител при липса на Cognito */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "giftnow_mock_user";

export type MockUser = {
  email: string;
  role: "user" | "tenant" | "manager" | "admin";
};

type MockAuthContextType = {
  user: MockUser | null;
  login: (email: string, role: MockUser["role"]) => void;
  logout: () => void;
};

const MockAuthContext = createContext<MockAuthContextType | null>(null);

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  const login = (email: string, role: MockUser["role"]) => {
    const u = { email, role };
    setUser(u);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <MockAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </MockAuthContext.Provider>
  );
}

export function useMockAuth() {
  const ctx = useContext(MockAuthContext);
  if (!ctx) throw new Error("useMockAuth must be used within MockAuthProvider");
  return ctx;
}
