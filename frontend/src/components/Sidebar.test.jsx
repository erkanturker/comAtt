// src/components/Sidebar.test.jsx

import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";

// Mock the useAuth hook
vi.mock("../contexts/AuthContext");

describe("Sidebar Component", () => {
  const mockLogout = vi.fn();

  it("renders admin links for admin user", () => {
    useAuth.mockReturnValue({
      logout: mockLogout,
      currentUser: { role: "admin" },
    });

    const { getByText } = render(
      <Router>
        <Sidebar isOpen={true} />
      </Router>
    );

    expect(getByText("Dashboard")).toBeInTheDocument();
    expect(getByText("Users")).toBeInTheDocument();
    expect(getByText("Groups")).toBeInTheDocument();
    expect(getByText("Students")).toBeInTheDocument();
    expect(getByText("Terms")).toBeInTheDocument();
    expect(getByText("Subjects")).toBeInTheDocument();
    expect(getByText("Periods")).toBeInTheDocument();
    expect(getByText("Report")).toBeInTheDocument();
  });

  it("renders teacher links for teacher user", () => {
    useAuth.mockReturnValue({
      logout: mockLogout,
      currentUser: { role: "teacher" },
    });

    render(
      <Router>
        <Sidebar isOpen={true} />
      </Router>
    );

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Attendance")).toBeInTheDocument();
  });

  it("calls logout on logout link click", () => {
    useAuth.mockReturnValue({
      logout: mockLogout,
      currentUser: { role: "admin" },
    });

    render(
      <Router>
        <Sidebar isOpen={true} />
      </Router>
    );

    const logoutLink = screen.getByText("Logout");
    fireEvent.click(logoutLink);

    expect(mockLogout).toHaveBeenCalled();
  });
});
