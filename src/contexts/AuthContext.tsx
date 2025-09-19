import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  subscription: 'free' | 'pro' | 'team' | 'enterprise';
  skillLevel: 'beginner' | 'mid' | 'senior';
  experienceYears: number;
  primaryLanguage: string;
  workContext: 'student' | 'professional' | 'hobbyist';
  learningGoals: string[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (provider: 'google' | 'github') => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        // Simulate user data - in real app, fetch from API
        setUser({
          id: '1',
          email: 'demo@example.com',
          name: 'Demo Developer',
          avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
          subscription: 'pro',
          skillLevel: 'mid',
          experienceYears: 3,
          primaryLanguage: 'JavaScript',
          workContext: 'professional',
          learningGoals: ['code-quality', 'performance', 'architecture']
        });
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (provider: 'google' | 'github') => {
    setLoading(true);
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    localStorage.setItem('auth_token', 'demo_token');
    setUser({
      id: '1',
      email: 'demo@example.com',
      name: 'Demo Developer',
      avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&fit=crop',
      subscription: 'pro',
      skillLevel: 'mid',
      experienceYears: 3,
      primaryLanguage: 'JavaScript',
      workContext: 'professional',
      learningGoals: ['code-quality', 'performance', 'architecture']
    });
    setLoading(false);
  };

  const signOut = async () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};