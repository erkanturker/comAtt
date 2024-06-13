// src/testUtils/mockAuth.js
import React from "react";
import { vi } from "vitest";
import { AuthContext } from "../contexts/AuthContext";

const mockAuthContext = {
  login: vi.fn(),
  currentUser: null,
  logout: vi.fn(),
  infoLoaded: true,
};

const MockAuthProvider = ({ children, user = null, infoLoaded = true }) => {
  const value = {
    ...mockAuthContext,
    currentUser: user,
    infoLoaded,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { MockAuthProvider, mockAuthContext };
