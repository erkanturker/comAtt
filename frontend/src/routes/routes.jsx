// src/router/index.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../components/Dashboard";
import GroupManagement from "../components/GroupManagement";
import UserManagment from "../components/UserManagment";
import LoginPage from "../pages/LoginPage";
import PrivateRoutes from "./PrivateRoutes";
import StudentManagement from "../components/StudentManagement";

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
            <UserManagment />
          </PrivateRoutes>
        ),
      },
      {
        path: "groups",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <GroupManagement />
          </PrivateRoutes>
        ),
      },
      {
        path: "students",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <StudentManagement />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
