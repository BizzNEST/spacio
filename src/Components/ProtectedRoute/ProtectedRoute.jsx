import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ProtectedRoute = () => {
  const { isAuthorized, isLoading } = useAuth();

  if (isLoading) return <p>Loading...</p>;

  return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
