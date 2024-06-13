import { render } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ErrorPage from "./ErrorPage";

describe("Error Page", () => {
  test("matches the snapshot", () => {
    const { asFragment } = render(
      <Router>
        <ErrorPage />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("renders ErrorPage with default props", () => {
    const { getByText } = render(
      <Router>
        <ErrorPage />
      </Router>
    );
    expect(getByText(/Error 500/i)).toBeInTheDocument();
    expect(getByText(/Something went wrong!/i)).toBeInTheDocument();
  });

  test("renders ErrorPage with custom error code and message", () => {
    const { getByText } = render(
      <Router>
        <ErrorPage errorCode={404} errorMessage="Page not found!" />
      </Router>
    );
    expect(getByText(/Error 404/i)).toBeInTheDocument();
    expect(getByText(/Page not found!/i)).toBeInTheDocument();
    expect(getByText(/Go Back/i)).toBeInTheDocument();
  });
});
