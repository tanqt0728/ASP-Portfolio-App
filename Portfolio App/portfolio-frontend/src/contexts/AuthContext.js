import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import CryptoJS from 'crypto-js'; // Import CryptoJS

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL_AUTH;

  // Placeholder function for validating token and fetching user details
  const validateTokenAndFetchUser = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/validate-token`, {
        method: 'GET',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        return data.user; // Adjust based on your API response
      }
      throw new Error(data.message || 'Token validation failed');
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      validateTokenAndFetchUser(token).then(user => {
        if (user) setUser(user);
      }).catch(err => console.log(err.message));
    }
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Login failed');
        return false;
      }
      setUser(data);
      localStorage.setItem('token', data.token);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [API_BASE_URL]);

  const signup = useCallback(async (email, password, fullName, dob, contactNumber, location) => {
    setError('');
    try {
        const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
        const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          hashedPassword,
          fullName,
          dob,
          contactNumber,
          location,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || 'Signup failed');
        return false; // Indicate that the signup was not successful
      }
      setUser(data.result); // Update user state with the result
      localStorage.setItem('token', data.token); // Store the token securely
      return true; // Indicate that the signup was successful
    } catch (err) {
      alert(err);

      setError(err.message || 'An unexpected error occurred during signup');
      return false; // Indicate failure to handle accordingly
    }
  }, [API_BASE_URL]);

  const forgotPassword = useCallback(async (email) => {
    try {
      await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        credentials: 'include',
      });
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
    } catch (err) {
      setError(err.message);
    }
  }, [API_BASE_URL]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
  }, []);

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
