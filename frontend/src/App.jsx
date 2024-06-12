// src/App.jsx
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css"; // Import your CSS file
import LoadingSpinner from "./components/CommonJsx/LoadingSpinner";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthContext";

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
