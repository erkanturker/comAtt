import { fireEvent } from "@testing-library/react";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useGroups from "../hooks/useGroups";
import useStudents from "../hooks/useStudents";
import { renderWithProviders } from "../testUtils/RenderWithProvider";
import StudentManagement from "./StudentManagement";

// Mock the useStudents and useGroups hooks
vi.mock("../hooks/useStudents");
vi.mock("../hooks/useGroups");

describe("StudentManagement Component", () => {
  const mockStudents = [
    {
      studentId: 1,
      groupId: 1,
      firstName: "Student FirstName",
      lastName: "Student LastName",
      age: 10,
      parentFirstName: "Parent FirstName",
      parentLastName: "Parent LastName",
      parentPhone: "123-456-7890",
      parentEmail: "parent@example.com",
    },
    {
      studentId: 2,
      groupId: 2,
      firstName: "Another FirstName",
      lastName: "Another LastName",
      age: 12,
      parentFirstName: "Another Parent FirstName",
      parentLastName: "Another Parent LastName",
      parentPhone: "987-654-3210",
      parentEmail: "anotherparent@example.com",
    },
  ];

  const mockGroups = [
    { groupId: 1, groupName: "Group 1" },
    { groupId: 2, groupName: "Group 2" },
  ];

  const mockAddStudent = vi.fn();
  const mockRemoveStudent = vi.fn();
  const mockCloseAlert = vi.fn();

  beforeEach(() => {
    useStudents.mockReturnValue({
      data: mockStudents,
      addItem: mockAddStudent,
      removeItem: mockRemoveStudent,
      loading: false,
      alert: { visible: false },
      closeAlert: mockCloseAlert,
    });

    useGroups.mockReturnValue({
      data: mockGroups,
    });
  });

  it("renders StudentManagement component", () => {
    const { getByRole } = renderWithProviders(<StudentManagement />, {
      username: "admin",
      role: "admin",
    });

    expect(getByRole("heading", { name: "Students" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Create Student" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "All Students" })).toBeInTheDocument();
  });

  it("should display list of students", () => {
    const { getByText } = renderWithProviders(<StudentManagement />, {
      username: "admin",
      role: "admin",
    });

    mockStudents.forEach((student) => {
      expect(getByText(student.firstName)).toBeInTheDocument();
      expect(getByText(student.lastName)).toBeInTheDocument();
      expect(getByText(student.parentFirstName)).toBeInTheDocument();
    });
  });

  it("should addStudent when the form is submitted", () => {
    const { getByPlaceholderText, getByTestId } = renderWithProviders(
      <StudentManagement />,
      {
        username: "admin",
        role: "admin",
      }
    );

    fireEvent.change(getByPlaceholderText("Enter First Name"), {
      target: { value: "NewFirst" },
    });
    fireEvent.change(getByPlaceholderText("Enter Last Name"), {
      target: { value: "NewLast" },
    });
    fireEvent.change(getByPlaceholderText("Enter Parent First Name"), {
      target: { value: "NewParentFirst" },
    });
    fireEvent.change(getByPlaceholderText("Enter Parent Last Name"), {
      target: { value: "NewParentLast" },
    });
    fireEvent.change(getByPlaceholderText("Enter Parent Phone"), {
      target: { value: "123-123-1234" },
    });
    fireEvent.change(getByPlaceholderText("Enter Parent Email"), {
      target: { value: "newparent@example.com" },
    });
    fireEvent.change(getByTestId("groupId"), {
      target: { value: "1" },
    });
    fireEvent.click(getByTestId("submit"));

    expect(mockAddStudent).toHaveBeenCalledWith({
      firstName: "NewFirst",
      lastName: "NewLast",
      parentFirstName: "NewParentFirst",
      parentLastName: "NewParentLast",
      parentPhone: "123-123-1234",
      parentEmail: "newparent@example.com",
      groupId: "1",
      age: "",
    });
  });
});
