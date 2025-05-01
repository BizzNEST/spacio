import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import Loader from '../Loader/Loader';

const ProtectedRoute = () => {
  const { isUserLoggedIn, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return isUserLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
