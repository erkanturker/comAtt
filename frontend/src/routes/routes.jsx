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
import TermManagement from "../components/TermManagement";
import SubjectManagement from "../components/SubjectManagement";
import PeriodManagement from "../components/PeriodManagement";
import AttendanceTeacher from "../components/AttendanceTeacher/AttendanceTeacher";
import AttendanceRemaining from "../components/AttendanceAdmin/AttendanceRemaining";
import AttendanceAdmin from "../components/AttendanceAdmin/AttendanceAdmin";
import AttendanceSubmitted from "../components/AttendanceAdmin/AttendanceSubmitted";

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
      {
        path: "terms",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <TermManagement />
          </PrivateRoutes>
        ),
      },
      {
        path: "subjects",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <SubjectManagement />
          </PrivateRoutes>
        ),
      },
      {
        path: "periods",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <PeriodManagement />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/remainingAttendances",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceRemaining />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/remainingAttendances/:periodId",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceAdmin />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/submittedAttendances",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceSubmitted />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/submittedAttendances/:periodId",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceAdmin />
          </PrivateRoutes>
        ),
      },
      {
        path: "attendances",
        element: (
          <PrivateRoutes roles={["teacher"]}>
            <AttendanceTeacher />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);

export default router;
