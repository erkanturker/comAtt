import { beforeEach, vi } from "vitest";
import useAttendanceTeacher from "../../hooks/useAttendanceTeacher";
import AttendanceTeacher from "./AttendanceTeacher";
import { renderWithProviders } from "../../testUtils/RenderWithProvider";

vi.mock("../../hooks/useAttendanceTeacher");

describe("AttendanceTeacher Component", () => {
  const mockUseAttendanceTeacher = {
    teacherSchedule: [
      {
        periodId: 1,
        periodNumber: 1,
        groupName: "Group A",
        attendanceTaken: false,
      },
      {
        periodId: 2,
        periodNumber: 2,
        groupName: "Group B",
        attendanceTaken: true,
      },
    ],
    selectedPeriodId: null,
    students: [
      { studentId: 1, firstName: "John", lastName: "Doe" },
      { studentId: 2, firstName: "Jane", lastName: "Smith" },
    ],
    attendances: [],
    handlePeriodSelect: vi.fn(),
    handleAttendanceChange: vi.fn(),
    handleSubmit: vi.fn(),
    loading: false,
    alert: { visible: false, type: "", title: "", messages: [] },
    closeAlert: vi.fn(),
  };

  beforeEach(() => {
    useAttendanceTeacher.mockReturnValue(mockUseAttendanceTeacher);
  });
  it("should render AttendanceTeacher componenet ", () => {
    const { getByText } = renderWithProviders(<AttendanceTeacher />, {
      username: "teacher",
      role: "teacher",
    });

    expect(getByText("Attendances")).toBeInTheDocument();
  });
});
