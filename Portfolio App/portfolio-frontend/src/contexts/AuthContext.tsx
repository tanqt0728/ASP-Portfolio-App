// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Import CryptoJS

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_AUTH;

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // necessary for cookies if your backend uses them
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Login failed');
        return false; // Indicate failure
      }
      setUser(data.result); // Adjust according to your API response
      localStorage.setItem('token', data.token); // Consider using httpOnly cookies instead for security
      return true; // Indicate success

    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [API_BASE_URL]);

  const signup = useCallback(async (email, password) => {
    setError(''); // Reset error state before attempting signup
    try {
      const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, hashedPassword }),
        credentials: 'include',
      });
  
      const data = await response.json();
      if (!response.ok) {
        // Use the error message from the response if available, otherwise use a generic message
        setError(data.message || 'Signup failed');
        return false; // Indicate that the signup was not successful
      }
  
      setUser(data.result); // Update user state with the result
      localStorage.setItem('token', data.token); // Store the token
      return true; // Indicate that the signup was successful
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during signup');
      return false; // Indicate failure to handle accordingly
    }
  }, [API_BASE_URL, setUser, setError]);
  

  const forgotPassword = useCallback(async (email) => {
    try {
      await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });
      // Handle response if needed
    } catch (err) {
      setError(err.message);
    }
  }, [API_BASE_URL]);

  const resetPassword = useCallback(async (password, token) => {
    try {
      await fetch(`${API_BASE_URL}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token }),
        credentials: 'include',
      });
      // Handle response if needed
    } catch (err) {
      setError(err.message);
    }
  }, [API_BASE_URL]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token'); // or clear your auth cookie
    // Add any other logout logic here
  }, []);

  // Optionally, implement a useEffect hook to check the token's validity on app load or rehydrate user state

  const value = {
    user,
    error,
    login,
    signup,
    forgotPassword,
    resetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
