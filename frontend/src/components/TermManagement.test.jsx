import { beforeEach, expect, it, vi } from "vitest";
import useTerms from "../hooks/useTerms";
import { renderWithProviders } from "../testUtils/RenderWithProvider";
import TermManagement from "./TermManagement";
import {
  fireEvent,
  getByPlaceholderText,
  getByText,
} from "@testing-library/react";
import moment from "moment";

vi.mock("../hooks/useTerms");

describe("Term Management Componenet", () => {
  const mockTerms = [
    {
      termId: 1,
      termName: "Summer",
      startDate: "2024-05-29T04:00:00.000Z",
      endDate: "2024-08-31T04:00:00.000Z",
    },
    {
      termId: 2,
      termName: "Fall",
      startDate: "2024-09-08T04:00:00.000Z",
      endDate: "2024-10-30T04:00:00.000Z",
    },
  ];

  const mockAddTerm = vi.fn();
  const mockRemoveTerm = vi.fn();
  const mockCloseAlert = vi.fn();

  beforeEach(() => {
    useTerms.mockReturnValue({
      data: mockTerms,
      addItem: mockAddTerm,
      removeItem: mockRemoveTerm,
      loading: false,
      alert: { visible: false },
      closeAlert: mockCloseAlert,
    });
  });

  it("should render TermManagement component ", () => {
    const { getByRole } = renderWithProviders(<TermManagement />, {
      username: "admin",
      role: "admin",
    });
    expect(getByRole("heading", { name: "Terms" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Create Term" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "All Terms" })).toBeInTheDocument();
  });

  it("should display list of terms ", () => {
    const { getByText } = renderWithProviders(<TermManagement />, {
      username: "admin",
      role: "admin",
    });

    mockTerms.forEach((term) => {
      expect(getByText(term.termId)).toBeInTheDocument();
      expect(getByText(term.termName)).toBeInTheDocument();
      expect(
        getByText(moment(term.startDate).format("MM-DD-YYYY"))
      ).toBeInTheDocument();
      expect(
        getByText(moment(term.endDate).format("MM-DD-YYYY"))
      ).toBeInTheDocument();
    });
  });
  it("should add Term when form is submitted", () => {
    const { getByTestId, getByLabelText, getByPlaceholderText } =
      renderWithProviders(<TermManagement />, {
        username: "admin",
        role: "admin",
      });

    fireEvent.change(getByPlaceholderText("Enter term name"), {
      target: { value: "Test Term" },
    });

    fireEvent.change(getByLabelText(/Start Date/i), {
      target: { value: "01/01/2025" },
    });

    fireEvent.change(getByLabelText(/End Date/i), {
      target: { value: "05/01/2025" },
    });

    fireEvent.click(getByTestId("submit"));

    expect(mockAddTerm).toHaveBeenCalledWith({
      termName: "Test Term",
      startDate: expect.any(Date),
      endDate: expect.any(Date),
    });
  });
});
