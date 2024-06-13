// src/components/AttendanceAdmin/AttendanceAdmin.test.jsx

import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import useAttendanceAdmin from "../../hooks/useAttendanceAdmin";
import { renderWithProviders } from "../../testUtils/RenderWithProvider";
import AttendanceAdmin from "./AttendanceAdmin";

vi.mock("../../hooks/useAttendanceAdmin");

describe("AttendanceAdmin Component", () => {
  const mockUseAttendanceAdmin = {
    period: { attendanceTaken: false },
    students: [
      { studentId: 1, firstName: "John", lastName: "Doe" },
      { studentId: 2, firstName: "Jane", lastName: "Smith" },
    ],
    attendances: [],
    loading: false,
    alert: { visible: false, type: "", title: "", messages: [] },
    handleAttendanceChange: vi.fn(),
    handleSubmit: vi.fn(),
    closeAlert: vi.fn(),
  };

  beforeEach(() => {
    useAttendanceAdmin.mockReturnValue(mockUseAttendanceAdmin);
  });

  it("renders AttendanceAdmin component", () => {
    const { getByText } = renderWithProviders(<AttendanceAdmin />, {
      username: "admin",
      role: "admin",
    });

    expect(getByText(/Pending Attendances/i)).toBeInTheDocument();
    expect(getByText(/John/i)).toBeInTheDocument();
    expect(getByText(/Doe/i)).toBeInTheDocument();
    expect(getByText(/Jane/i)).toBeInTheDocument();
    expect(getByText(/Smith/i)).toBeInTheDocument();
  });
});
