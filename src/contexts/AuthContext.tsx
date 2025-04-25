
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

// This is a mock Firebase auth implementation
// In a real app, you would use the Firebase SDK

interface User {
  uid: string;
  email: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock storage for demo purposes
  const getUserFromStorage = () => {
    const storedUser = localStorage.getItem("blazeAlertUser");
    return storedUser ? JSON.parse(storedUser) : null;
  };

  useEffect(() => {
    // Check if user is logged in from localStorage
    const user = getUserFromStorage();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you would use Firebase.auth().signInWithEmailAndPassword
      // For this demo, we'll simulate a successful login after a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials (mock)
      if (email === "user@example.com" && password === "password") {
        const user = { uid: "123456", email };
        localStorage.setItem("blazeAlertUser", JSON.stringify(user));
        setCurrentUser(user);
        toast.success("Successfully logged in");
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Failed to log in");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, you would use Firebase.auth().createUserWithEmailAndPassword
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = { uid: "654321", email };
      localStorage.setItem("blazeAlertUser", JSON.stringify(user));
      setCurrentUser(user);
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("Failed to create account");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      // In a real app, you would use Firebase.auth().signOut
      await new Promise(resolve => setTimeout(resolve, 500));
      
      localStorage.removeItem("blazeAlertUser");
      setCurrentUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      // In a real app, you would use Firebase.auth().sendPasswordResetEmail
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error("Failed to send password reset email");
      throw error;
    }
  };

  const updateEmail = async (email: string) => {
    try {
      // In a real app, you would use currentUser.updateEmail
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (currentUser) {
        const updatedUser = { ...currentUser, email };
        localStorage.setItem("blazeAlertUser", JSON.stringify(updatedUser));
        setCurrentUser(updatedUser);
        toast.success("Email updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update email");
      throw error;
    }
  };

  const updatePassword = async (password: string) => {
    try {
      // In a real app, you would use currentUser.updatePassword
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
      throw error;
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
