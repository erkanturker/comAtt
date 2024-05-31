// src/router/index.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users";
import MainLayout from "../components/MainLayout"; // The layout that includes the sidebar
import LoginPage from "../pages/LoginPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />, // Default route showing the login page
  },
  {
    path: "/",
    element: <PrivateRoutes />, // Main layout with sidebar
    children: [
      {
        path: "/",
        element: <App />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "users", element: <Users /> },
        ],
      },
    ],
  },
]);

export default router;
