// src/router/index.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users";
import LoginPage from "../pages/LoginPage";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />, // Route for the login page
  },
  {
    path: "/",
    element: (
      <PrivateRoutes roles={["admin", "teacher", "user"]}>
        <App />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoutes roles={["admin", "teacher"]}>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <Users />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
