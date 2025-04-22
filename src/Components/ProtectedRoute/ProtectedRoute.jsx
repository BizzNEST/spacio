import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

const ProtectedRoute = () => {
  const { isUserLoggedIn, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
