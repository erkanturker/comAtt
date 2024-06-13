import { fireEvent, screen } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useAttendanceRate from "../hooks/useAttendanceRate";
import useGroups from "../hooks/useGroups";
import useStudents from "../hooks/useStudents";
import { renderWithProviders } from "../testUtils/RenderWithProvider";
import ReportAdmin from "./ReportAdmin";

// Mock the hooks
vi.mock("../hooks/useGroups");
vi.mock("../hooks/useStudents");
vi.mock("../hooks/useAttendanceRate");

describe("ReportAdmin Component", () => {
  const mockGroups = [
    { groupId: 1, groupName: "Group A" },
    { groupId: 2, groupName: "Group B" },
  ];

  const mockStudents = [
    { studentId: 1, firstName: "John", lastName: "Doe", groupId: 1 },
    { studentId: 2, firstName: "Jane", lastName: "Doe", groupId: 1 },
    { studentId: 3, firstName: "Jim", lastName: "Beam", groupId: 2 },
  ];

  const mockAttendances = [
    {
      studentId: 1,
      termName: "Term 1",
      date: "2025-01-01",
      periodNumber: 1,
      status: true,
    },
    {
      studentId: 1,
      termName: "Term 1",
      date: "2025-01-01",
      periodNumber: 2,
      status: false,
    },
  ];

  beforeEach(() => {
    useGroups.mockReturnValue({ data: mockGroups });
    useStudents.mockReturnValue({ data: mockStudents });
    useAttendanceRate.mockReturnValue({ termAttendances: mockAttendances });
  });

  it("renders ReportAdmin component", () => {
    renderWithProviders(<ReportAdmin />, {
      username: "admin",
      role: "admin",
    });

    expect(screen.getByRole("heading", { name: "Report" })).toBeInTheDocument();
  });

  it("displays dropdowns and allows selections", () => {
    renderWithProviders(<ReportAdmin />, {
      username: "admin",
      role: "admin",
    });

    // Select a group
    const groupDropdown = screen.getByLabelText("Select a Group");
    fireEvent.change(groupDropdown, { target: { value: "1" } });

    // Select a student
    const studentDropdown = screen.getByLabelText("Select a Student");
    fireEvent.change(studentDropdown, { target: { value: "1" } });
  });
});
