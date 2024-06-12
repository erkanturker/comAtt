// src/App.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import "./App.css"; // Import your CSS file
import Sidebar from "./components/Sidebar";
import { useAuth } from "./contexts/AuthContext";
import LoadingSpinner from "./components/CommonJsx/LoadingSpinner";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const { currentUser, infoLoaded } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (infoLoaded && currentUser) {
      if (currentUser.role === "admin") {
        navigate("/dashboard/admin");
      } else if (currentUser.role === "teacher") {
        navigate("/dashboard/teacher");
      } else {
        navigate("/unauthorized");
      }
    }
  }, [currentUser]);

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
