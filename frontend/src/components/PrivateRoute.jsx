import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ adminOnly = false }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // You can show a loading spinner here
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (adminOnly && user.role !== 'admin') {
    return <Navigate to="/" replace />; // Redirect to home if not an admin
  }
  
  return <Outlet />;
}
