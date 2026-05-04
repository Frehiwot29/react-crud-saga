// src/components/PublicRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = ({ children }) => {
  const { user, token } = useSelector(state => state.auth);
  
  // If user is already authenticated, redirect to appropriate dashboard
  if (token && user) {
    if (user.role === 'BREEDER') {
      return <Navigate to="/breeder-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};

export default PublicRoute;