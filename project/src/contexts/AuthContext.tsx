import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Child {
  id: string;
  name: string;
  grade: string;
  school: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  child: Child | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  setChildInfo: (childInfo: Child) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [child, setChild] = useState<Child | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Mock implementation - would connect to a real API in production
  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    setUser({
      id: '1',
      name: 'Jane Doe',
      email: email,
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    
    setChild({
      id: '1',
      name: 'Alex Doe',
      grade: '8th Grade',
      school: 'Lincoln Middle School',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150'
    });
    
    setIsAuthenticated(true);
  };

  const signup = async (email: string, password: string, name: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful signup
    setUser({
      id: '1',
      name: name,
      email: email
    });
    
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setChild(null);
    setIsAuthenticated(false);
  };

  const setChildInfo = (childInfo: Child) => {
    setChild(childInfo);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        child, 
        isAuthenticated, 
        login, 
        signup, 
        logout, 
        setChildInfo 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};