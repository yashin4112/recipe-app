// contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Type for the context
interface AuthContextType {
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>; // Add signUp type
  user: any; // You can define a user type here
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Here, 'user' could be an object that holds user details

  const signIn = async (email: string, password: string) => {
    // Implement your authentication logic (e.g., call API or check credentials)
    // For now, assuming a success scenario:
    setUser({ email, name: "User" }); // Example of setting the user after login
  };

  const signUp = async (email: string, password: string) => {
    // Implement user registration logic (e.g., call API to create an account)
    // For now, assuming a success scenario:
    setUser({ email, name: "New User" }); // Example of setting the user after sign up
  };

  return (
    <AuthContext.Provider value={{ signIn, signUp, user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
