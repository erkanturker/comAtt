import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useGroups from "../hooks/useGroups";
import usePeriods from "../hooks/usePeriods";
import useSubject from "../hooks/useSubject";
import useTerms from "../hooks/useTerms";
import { renderWithProviders } from "../testUtils/RenderWithProvider";
import PeriodManagement from "./PeriodManagement";

// Mock the hooks
vi.mock("../hooks/useGroups");
vi.mock("../hooks/usePeriods");
vi.mock("../hooks/useSubject");
vi.mock("../hooks/useTerms");

describe("PeriodManagement Component", () => {
  const mockGroups = [
    { groupId: 1, groupName: "Group A" },
    { groupId: 2, groupName: "Group B" },
  ];

  const mockTerms = [
    { termId: 1, termName: "Term 1" },
    { termId: 2, termName: "Term 2" },
  ];

  const mockSubjects = [
    { subjectId: 1, subjectName: "Math" },
    { subjectId: 2, subjectName: "Science" },
  ];

  const mockPeriods = [
    {
      termId: 1,
      groupId: 1,
      subjectId: 1,
      periodNumber: 1,
      date: "2025-01-01",
    },
    {
      termId: 2,
      groupId: 2,
      subjectId: 2,
      periodNumber: 2,
      date: "2025-01-02",
    },
  ];

  beforeEach(() => {
    useGroups.mockReturnValue({ data: mockGroups });
    usePeriods.mockReturnValue({
      data: mockPeriods,
      addItem: vi.fn(),
      alert: { visible: false },
      closeAlert: vi.fn(),
      handleCopy: vi.fn(),
      loading: false,
    });
    useSubject.mockReturnValue({ data: mockSubjects });
    useTerms.mockReturnValue({ data: mockTerms });
  });

  it("renders PeriodManagement component", () => {
    const { getByRole } = renderWithProviders(<PeriodManagement />, {
      username: "admin",
      role: "admin",
    });

    // Check if the component renders correctly
    expect(getByRole("heading", { name: "Periods" })).toBeInTheDocument();
  });
});
