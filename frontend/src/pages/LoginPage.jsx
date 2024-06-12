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
    return <Navigate to="/" />;
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
              placeholder="admin@mail.com"
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
      </div>
    </Container>
  );
};

export default LoginPage;
