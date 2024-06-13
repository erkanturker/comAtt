import { beforeEach, expect } from "vitest";
import useAttendanceTeacher from "../hooks/useAttendanceTeacher";
import { renderWithProviders } from "../testUtils/RenderWithProvider";
import DashboardTeacher from "./DashboardTeacher";

vi.mock("../hooks/useAttendanceTeacher");

describe("Dashboard Teacher Component", () => {
  const mockData = {
    remainingAttendance: [{ id: 1 }, { id: 2 }, { id: 3 }],
    submittedAttendances: [{ id: 4 }],
    loading: false,
  };

  beforeEach(() => {
    useAttendanceTeacher.mockReturnValue(mockData);
  });

  it("should render Dashboard Teacher", () => {
    const { getByText } = renderWithProviders(<DashboardTeacher />, {
      username: "teacher",
      role: "teacher",
    });
    expect(getByText("Done")).toBeInTheDocument();
    expect(getByText("Remaining")).toBeInTheDocument();
    expect(getByText(mockData.remainingAttendance.length)).toBeInTheDocument();
    expect(getByText(mockData.remainingAttendance.length)).toBeInTheDocument();
  });
});
