import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children }) {
    const {isAuthorized} = useAuth();

    console.log(isAuthorized);  
  return (
    <>
    {isAuthorized ? <Outlet /> : <Navigate to="/login" />}
    </>
    );

}

export default ProtectedRoute;