// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useSelector(state => state.auth);
  
  // Check if user is authenticated
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if role is required and matches
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'BREEDER') {
      return <Navigate to="/breeder-dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }
  
  return children;
};

export default ProtectedRoute;