// src/router/index.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AttendanceAdmin from "../components/AttendanceAdmin/AttendanceAdmin";
import AttendanceRemaining from "../components/AttendanceAdmin/AttendanceRemaining";
import AttendanceSubmitted from "../components/AttendanceAdmin/AttendanceSubmitted";
import AttendanceTeacher from "../components/AttendanceTeacher/AttendanceTeacher";
import DashboardAdmin from "../components/DashboardAdmin";
import GroupManagement from "../components/GroupManagement";
import PeriodManagement from "../components/PeriodManagement";
import StudentManagement from "../components/StudentManagement";
import SubjectManagement from "../components/SubjectManagement";
import TermManagement from "../components/TermManagement";
import UserManagment from "../components/UserManagment";
import LoginPage from "../pages/LoginPage";
import PrivateRoutes from "./PrivateRoutes";
import DashboardTeacher from "../components/DashboardTeacher";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
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
        path: "dashboard/admin",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <DashboardAdmin />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/teacher",
        element: (
          <PrivateRoutes roles={["teacher"]}>
            <DashboardTeacher />
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
        path: "dashboard/admin/remainingAttendances",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceRemaining />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/admin/remainingAttendances/:periodId",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceAdmin />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/admin/submittedAttendances",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceSubmitted />
          </PrivateRoutes>
        ),
      },
      {
        path: "dashboard/admin/submittedAttendances/:periodId",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <AttendanceAdmin />
          </PrivateRoutes>
        ),
      },
      {
        path: "/attendances",
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
