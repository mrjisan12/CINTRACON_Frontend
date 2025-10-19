import { createContext, useContext, useState, useEffect } from 'react';
import { getProfile } from '../api/authApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));

  useEffect(() => {
    if (token) {
      // Verify token and get user data
      verifyToken();
    } else {
      setLoading(false);
    }
  }, [token]);

  const verifyToken = async () => {
  try {
    // আপনার existing authApi use করুন
    const response = await getProfile(token); // আপনার authApi থেকে
    
    if (response.data) {
      const userData = response.data;
      setUser(userData);
    } else {
      logout();
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    logout();
  } finally {
    setLoading(false);
  }
};

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('accessToken', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('accessToken');
    // Call logout API if needed
  };

  const value = {
    user,
    token,
    login,
    logout,
    loading,
    isAuthenticated: !!user && !!token,
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};