// src/components/PrivateRoutes.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoutes = ({ roles, children }) => {
  const { currentUser } = useAuth();
  const userRole = currentUser?.role;

  console.log("PrivateRoutes - Current role:", userRole); // Debugging line
  console.log("PrivateRoutes - Required roles:", roles); // Debugging line

  if (!currentUser) {
    console.log("Not logged in, redirecting to login");
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(userRole)) {
    console.log("Role not authorized, redirecting to unauthorized");
    return <Navigate to="/unauthorized" />;
  }

  console.log("Authorized, rendering outlet");
  return children;
};

export default PrivateRoutes;
