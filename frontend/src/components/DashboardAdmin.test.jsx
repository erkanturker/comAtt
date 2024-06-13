import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useAttendanceRate from "../hooks/useAttendanceRate";
import useGroups from "../hooks/useGroups";
import usePeriods from "../hooks/usePeriods";
import useStudents from "../hooks/useStudents";
import useSubjects from "../hooks/useSubject";
import useTerms from "../hooks/useTerms";
import useUsers from "../hooks/useUsers";
import { renderWithProviders } from "../testUtils/RenderWithProvider";
import DashboardAdmin from "./DashboardAdmin";

// Mock the hooks
vi.mock("../hooks/useAttendanceRate");
vi.mock("../hooks/useGroups");
vi.mock("../hooks/usePeriods");
vi.mock("../hooks/useStudents");
vi.mock("../hooks/useSubject");
vi.mock("../hooks/useTerms");
vi.mock("../hooks/useUsers");

describe("DashboardAdmin Component", () => {
  const mockUsers = [
    { username: "teacher1", role: "teacher" },
    { username: "teacher2", role: "teacher" },
  ];

  const mockGroups = [
    { groupId: 1, groupName: "Group A" },
    { groupId: 2, groupName: "Group B" },
  ];

  const mockStudents = [
    { studentId: 1, firstName: "John", lastName: "Doe" },
    { studentId: 2, firstName: "Jane", lastName: "Doe" },
  ];

  const mockSubjects = [
    { subjectId: 1, subjectName: "Math" },
    { subjectId: 2, subjectName: "Science" },
  ];

  const mockTerms = [
    { termId: 1, termName: "Term 1" },
    { termId: 2, termName: "Term 2" },
  ];

  const mockTakenAttendance = [
    { periodId: 1, periodNumber: 1 },
    { periodId: 2, periodNumber: 2 },
  ];

  const mockPendingAttendance = [
    { periodId: 3, periodNumber: 3 },
    { periodId: 4, periodNumber: 4 },
  ];

  const mockAttendanceRate = {
    termRate: 95,
    currentRate: 90,
  };

  beforeEach(() => {
    useUsers.mockReturnValue({ data: mockUsers });
    useGroups.mockReturnValue({ data: mockGroups });
    useStudents.mockReturnValue({ data: mockStudents });
    useSubjects.mockReturnValue({ data: mockSubjects });
    useTerms.mockReturnValue({ data: mockTerms });
    usePeriods.mockReturnValue({
      takenAttendance: mockTakenAttendance,
      pendingAttendance: mockPendingAttendance,
    });
    useAttendanceRate.mockReturnValue(mockAttendanceRate);
  });
  it("should render Dashboard Admin Component ", () => {
    const { getByRole } = renderWithProviders(<DashboardAdmin />, {
      username: "admin",
      role: "admin",
    });
    expect(getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Quick Stats" })).toBeInTheDocument();

    expect(
      getByRole("heading", { name: "Current Week Attendace" })
    ).toBeInTheDocument();
    
    expect(
      getByRole("heading", { name: "Attendace Rates" })
    ).toBeInTheDocument();
  });
});
