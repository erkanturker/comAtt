// src/components/PrivateRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoutes = ({ roles, children }) => {
  const { currentUser } = useAuth();
  const userRole = currentUser?.role;


  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoutes;
