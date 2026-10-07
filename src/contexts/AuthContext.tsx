import React, { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "doctor";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isDoctor: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const mockUsers: Record<string, { user: User; password: string }> = {
  "admin@surgicore.com": {
    password: "admin123",
    user: {
      id: "USR-ADMIN-001",
      name: "Admin SurgiCore",
      email: "admin@surgicore.com",
      role: "admin",
      avatar: "AD",
      department: "Administration",
    },
  },
  "surgeon@surgicore.com": {
    password: "doctor123",
    user: {
      id: "USR-DOC-001",
      name: "Dr. Sarah Chen",
      email: "surgeon@surgicore.com",
      role: "doctor",
      avatar: "SC",
      department: "Orthopedic Surgery",
    },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("surgicore_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, password: string) => {
    const entry = mockUsers[email.toLowerCase()];
    if (entry && entry.password === password) {
      setUser(entry.user);
      localStorage.setItem("surgicore_user", JSON.stringify(entry.user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("surgicore_user");
  };

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates, avatar: updates.name ? updates.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() : user.avatar };
    setUser(updated);
    localStorage.setItem("surgicore_user", JSON.stringify(updated));
  };

  const isAdmin = user?.role === "admin";
  const isDoctor = user?.role === "doctor";

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin, isDoctor, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
