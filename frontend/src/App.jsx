// src/App.jsx
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "./App.css"; // Import your CSS file
import Sidebar from "./components/Sidebar";

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

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
