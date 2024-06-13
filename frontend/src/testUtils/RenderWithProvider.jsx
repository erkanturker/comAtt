import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { MockAuthProvider } from "./MockAuthProvider";

const renderWithProviders = (ui, user = {}) => {
  return render(
    <MemoryRouter>
      <MockAuthProvider user={user}>{ui}</MockAuthProvider>
    </MemoryRouter>
  );
};
export { renderWithProviders };
