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
import ErrorPage from "../pages/ErrorPage";
import ReportAdmin from "../components/ReportAdmin";

/**
Login Route: The /login path is linked to the LoginPage component.
Unauthorized Route: The /unauthorized path displays an error page with a 403 status.

Root Path:
Uses PrivateRoutes to ensure only authenticated users with the roles admin, teacher, or user can access.
Wraps the App component which acts as a layout for nested routes.
 */

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: (
      <ErrorPage
        errorCode={403}
        errorMessage="You do not have permission to view this page."
      />
    ),
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
        path: "/report",
        element: (
          <PrivateRoutes roles={["admin"]}>
            <ReportAdmin />
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
  {
    path: "*",
    element: <ErrorPage errorCode={404} errorMessage="Page not Found" />,
  },
]);

export default router;
