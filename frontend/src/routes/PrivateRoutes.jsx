import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/**
 * PrivateRoutes component to handle protected routes based on user roles.
 *
 * @param {Array} props.roles - Array of roles allowed to access the route.
 * @param {React.Node} props.children - Children components to be rendered if access is granted.
 * @returns {React.Node} - Rendered component based on access control.
 */

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
