import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProfileInfo } from '../api/authApi';

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
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Check for existing token on mount
    useEffect(() => {
        const initializeAuth = async () => {
            const storedToken = localStorage.getItem('accessToken');
            
            if (storedToken) {
                try {
                    // Verify token is valid by fetching user profile
                    const response = await getProfileInfo(storedToken);
                    if (response.data.success) {
                        setToken(storedToken);
                        setUser(response.data.data);
                        setIsAuthenticated(true);
                    } else {
                        // Token is invalid, clear it
                        localStorage.removeItem('accessToken');
                    }
                } catch (error) {
                    console.error('Token validation failed:', error);
                    localStorage.removeItem('accessToken');
                }
            }
            setLoading(false);
        };

        initializeAuth();
    }, []);

    const login = (userData, accessToken) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('user_id', userData.id);
        // console.log("Logged in user ID:", userData.id);
        setToken(accessToken);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        token,
        isAuthenticated,
        loading,
        login,
        logout,
        setUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};