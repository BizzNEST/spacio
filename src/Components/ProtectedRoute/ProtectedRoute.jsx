import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
    const {isAuthenticated} = useAuth();
  return (
    <>
    {isAuthenticated ? <Outlet /> : <Navigate to="/login" />}
    </>
    );

}

export default ProtectedRoute;