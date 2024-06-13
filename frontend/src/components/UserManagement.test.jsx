import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useUsers from "../hooks/useUsers";
import { renderWithProviders } from "../testUtils/RenderWithProvider";
import UserManagment from "./UserManagement";
import { fireEvent } from "@testing-library/react";

// Mock the useUsers hook
vi.mock("../hooks/useUsers");

describe("UserManagement Component", () => {
  const mockUsers = [
    {
      username: "admintest1",
      firstName: "Admin FirstName",
      lastName: "Admin LastNAme",
      email: "admin1@example.com",
      role: "admin",
    },
    {
      username: "teacher1",
      firstName: "Teacher FirstName",
      lastName: "Teacher LastName",
      email: "teacher1@example.com",
      role: "teacher",
    },
  ];

  const mockAddUser = vi.fn();
  const mockRemoveUser = vi.fn();
  const mockCloseAlert = vi.fn();

  beforeEach(() => {
    useUsers.mockReturnValue({
      data: mockUsers,
      addItem: mockAddUser,
      removeItem: mockRemoveUser,
      loading: false,
      alert: { visible: false },
      closeAlert: mockCloseAlert,
    });
  });

  it("renders UserManagement component", () => {
    const { getByRole } = renderWithProviders(<UserManagment />, {
      username: "admin",
      role: "admin",
    });

    expect(getByRole("heading", { name: "Users" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Create User" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "All Users" })).toBeInTheDocument();
  });

  it("should display list of users ", () => {
    const { getByText } = renderWithProviders(<UserManagment />, {
      username: "admin",
      role: "admin",
    });

    mockUsers.forEach((user) => {
      expect(getByText(user.username)).toBeInTheDocument();
      expect(getByText(user.firstName)).toBeInTheDocument();
      expect(getByText(user.lastName)).toBeInTheDocument();
      expect(getByText(user.email)).toBeInTheDocument();
    });
  });

  it("should addUser when the form is submitted", () => {
    const { getByPlaceholderText, getByTestId } = renderWithProviders(
      <UserManagment />,
      {
        username: "admin",
        role: "admin",
      }
    );

    fireEvent.change(getByPlaceholderText("Enter username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(getByPlaceholderText("Enter password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByPlaceholderText("Enter first name"), {
      target: { value: "first" },
    });
    fireEvent.change(getByPlaceholderText("Enter last name"), {
      target: { value: "last" },
    });
    fireEvent.change(getByPlaceholderText("Enter email"), {
      target: { value: "email@gmaill.com" },
    });
    fireEvent.change(getByTestId("role"), {
      target: { value: "admin" },
    });
    fireEvent.click(getByTestId("submit"));

    expect(mockAddUser).toHaveBeenCalledWith({
      username: "newuser",
      password: "password",
      firstName: "first",
      lastName: "last",
      email: "email@gmaill.com",
      role: "admin",
    });
  });
});
