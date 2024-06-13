import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect, test } from "vitest";
import LoginPage from "./LoginPage";
import { AuthProvider } from "../contexts/AuthContext"; // import your AuthProvider

describe("Login Page", () => {
  test("Test", () => {
    const { getByText } = render(
      <Router>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Router>
    );
    expect(getByText(/Login Panel/i)).toBeInTheDocument();
  });

  test("Test", () => {
    const { asFragment } = render(
      <Router>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
