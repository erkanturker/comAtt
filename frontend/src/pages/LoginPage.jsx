// src/components/LoginPage.jsx
import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./LoginPage.css"; // Import the CSS file
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import useFormData from "../hooks/useFormData";

const LoginPage = () => {
  const [formData, setFormData] = useFormData({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData);
  };

  const { isLogin, login, currentUser } = useAuth();
  console.log(currentUser);
  if (currentUser) {
    return <Navigate to="/" />;
  }

  return (
    <Container className="login-container">
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
