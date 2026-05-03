// src/context/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, token, loading } = useSelector(state => state.auth);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated on mount
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser && !token) {
      // Restore session if token exists in localStorage but not in state
      const userData = JSON.parse(storedUser);
      dispatch({ 
        type: 'SET_USER', 
        payload: { user: userData, token: storedToken } 
      });
      setIsAuthenticated(true);
    } else if (token && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [dispatch, token, user]);

  const login = (email, password) => {
    dispatch({ type: 'LOGIN_REQUEST', payload: { email, password } });
  };

  const register = (userData) => {
    dispatch({ type: 'REGISTER_REQUEST', payload: userData });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const updateProfile = (userData) => {
    dispatch({ type: 'UPDATE_PROFILE_REQUEST', payload: userData });
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isBreeder: user?.role === 'BREEDER',
    isBuyer: user?.role === 'BUYER'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;