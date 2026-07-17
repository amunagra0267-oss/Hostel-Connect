import { createContext, useContext, useState, useCallback } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "hostelconnect.role";

export const ROLES = {
  STUDENT: "student",
  WARDEN: "warden",
  SECURITY: "security",
    WORKER: "worker", 
  ADMIN: "admin",
};

export function AuthProvider({ children }) {
  const [role, setRole] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  // Replace this with your real authentication call.
  const loginAs = useCallback((chosenRole) => {
    setRole(chosenRole);
    try {
      sessionStorage.setItem(STORAGE_KEY, chosenRole);
    } catch {
      /* sessionStorage unavailable */
    }
  }, []);

  const logout = useCallback(() => {
    setRole(null);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      /* no-op */
    }
  }, []);

  return (
    <AuthContext.Provider value={{ role, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}