import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import { MockAuthProvider } from "../testUtils";
import LoginPage from "../pages/LoginPage";
import DashboardAdmin from "../components/DashboardAdmin";
import DashboardTeacher from "../components/DashboardTeacher";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoutes from "./PrivateRoutes";
import App from "../App";

/**
 * Test cases for various routes in the application
 */
describe("Router", () => {
  it("renders LoginPage for /login route", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <MockAuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </MockAuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Login Panel/i)).toBeInTheDocument();
  });

  it("renders DashboardAdmin for /dashboard/admin route when user is admin", () => {
    const adminUser = {
      username: "adminuser",
      role: "admin",
    };

    render(
      <MemoryRouter initialEntries={["/dashboard/admin"]}>
        <MockAuthProvider user={adminUser}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<PrivateRoutes roles={["admin"]} />}>
                <Route path="dashboard/admin" element={<DashboardAdmin />} />
              </Route>
            </Route>
          </Routes>
        </MockAuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  it("renders Teacher for /dashboard/teacher route when user is admin", () => {
    const adminUser = {
      username: "adminuser",
      role: "teacher",
    };

    render(
      <MemoryRouter initialEntries={["/dashboard/teacher"]}>
        <MockAuthProvider user={adminUser}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<PrivateRoutes roles={["teacher"]} />}>
                <Route
                  path="dashboard/teacher"
                  element={<DashboardTeacher />}
                />
              </Route>
            </Route>
          </Routes>
        </MockAuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
  it("renders ErrorPage for /dashboard/admin route when user is not admin", () => {
    const nonAdminUser = {
      username: "testuser",
      role: "teacher",
    };

    render(
      <MemoryRouter initialEntries={["/dashboard/admin"]}>
        <MockAuthProvider user={nonAdminUser}>
          <Routes>
            <Route path="/" element={<App />}>
              <Route element={<PrivateRoutes roles={["admin"]} />}>
                <Route path="dashboard/admin" element={<DashboardAdmin />} />
              </Route>
              <Route
                path="/unauthorized"
                element={
                  <ErrorPage
                    errorCode={403}
                    errorMessage="You do not have permission to view this page."
                  />
                }
              />
            </Route>
          </Routes>
        </MockAuthProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/You do not have permission to view this page./i)
    ).toBeInTheDocument();
  });
});
