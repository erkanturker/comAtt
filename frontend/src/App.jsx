import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css"; //
import LoadingSpinner from "./components/CommonJsx/LoadingSpinner";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthContext";

/**
 * Main application component that handles the layout including the sidebar and main content area.
 * It also manages the loading state and ensures the user information is loaded before rendering the main content.
 */

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const { infoLoaded } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!infoLoaded) return <LoadingSpinner />;

  return (
    <div className="d-flex">
      <Sidebar isOpen={isOpen} />
      <Container fluid className={`main-content ${isOpen ? "" : "expanded"}`}>
        <button
          className="btn btn-outline-primary mt-1 mb-4"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
