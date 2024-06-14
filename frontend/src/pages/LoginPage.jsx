// src/components/LoginPage.jsx
import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./LoginPage.css"; // Import the CSS file
import { useAuth } from "../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import useFormData from "../hooks/useFormData";
import CustomAlert from "../components/CommonJsx/CustomAlert";

/**
 * LoginPage Component
 *
 * This component renders the login page for the Student Attendance System.
 * It allows users to input their username and password to log in.
 * If the user is already logged in, it redirects them to their respective dashboard based on their role.
 */

const LoginPage = () => {
  const [formData, setFormData] = useFormData({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);
  const [alertVisible, setAlertVisible] = useState(true);
  const navigate = useNavigate();
  const { login, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await login(formData);
    if (resp.result === "success") {
      navigate("/");
    } else {
      setFormErrors((previous) => [...previous, resp.error]);
      setAlertVisible(true);
    }
  };

  if (currentUser) {
    if (currentUser.role === "admin") {
      return <Navigate to="/dashboard/admin" />;
    } else if (currentUser.role === "teacher") {
      return <Navigate to="/dashboard/teacher" />;
    }
  }

  return (
    <Container className="login-container">
      {formErrors.length > 0 && alertVisible && (
        <CustomAlert
          type="danger"
          title="Oh snap! You got an error!"
          messages={formErrors}
          visible={alertVisible}
          onClose={() => setAlertVisible(false)}
        />
      )}
      <div className="login-card">
        <FontAwesomeIcon icon={faUser} className="login-icon" />
        <h2 className="login-title">STUDENT ATTENDANCE SYSTEM</h2>
        <h4 className="login-title">Login Panel</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              className="login-input"
              name="username"
              type="text"
              placeholder="Enter username"
              onChange={setFormData}
              value={formData.username}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="login-input"
              type="password"
              name="password"
              onChange={setFormData}
              value={formData.password}
              placeholder="Enter password"
              required
            />
          </Form.Group>
          <Button variant="success" type="submit" className="login-button">
            Login
          </Button>
        </Form>
        <p className="mt-1"> Admin User: Username: admin Password: 12345</p>
        <p> Teacher User: Username: ejohnson Password: 12345</p>
        <p> Teacher User: Username: jsmith Password: 12345</p>
        <p> Teacher User: Username: sbrown Password: 12345</p>
        <p> Teacher User: Username: dwilliams Password: 12345</p>
      </div>
    </Container>
  );
};

export default LoginPage;
