// src/components/GroupManagement.test.jsx

import React from "react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GroupManagement from "./GroupManagement";
import useGroups from "../hooks/useGroups";
import { renderWithProviders } from "../testUtils/RenderWithProvider";

// Mock the useGroups hook
vi.mock("../hooks/useGroups");

describe("GroupManagement Component", () => {
  const mockGroups = [
    { groupId: 1, groupName: "Group 1" },
    { groupId: 2, groupName: "Group 2" },
  ];

  const mockAddGroup = vi.fn();
  const mockRemoveGroup = vi.fn();
  const mockCloseAlert = vi.fn();

  beforeEach(() => {
    useGroups.mockReturnValue({
      data: mockGroups,
      addItem: mockAddGroup,
      removeItem: mockRemoveGroup,
      loading: false,
      alert: { visible: false },
      closeAlert: mockCloseAlert,
    });
  });

  it("renders GroupManagement component", () => {
    const { getByRole } = renderWithProviders(<GroupManagement />, {
      username: "admin",
      role: "admin",
    });

    expect(getByRole("heading", { name: "Groups" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "Create Group" })).toBeInTheDocument();
    expect(getByRole("heading", { name: "All Groups" })).toBeInTheDocument();
  });

  it("should display list of groups", () => {
    const { getByText } = renderWithProviders(<GroupManagement />, {
      username: "admin",
      role: "admin",
    });

    mockGroups.forEach((group) => {
      expect(getByText(group.groupName)).toBeInTheDocument();
    });
  });

  it("should addGroup when the form is submitted", () => {
    const { getByPlaceholderText, getByTestId } = renderWithProviders(
      <GroupManagement />,
      {
        username: "admin",
        role: "admin",
      }
    );

    fireEvent.change(getByPlaceholderText("Enter group name"), {
      target: { value: "New Group" },
    });
    fireEvent.click(getByTestId("submit"));

    expect(mockAddGroup).toHaveBeenCalledWith({
      groupName: "New Group",
    });
  });
});
