// src/components/LoginPage.jsx
import React from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "./LoginPage.css"; // Import the CSS file

const LoginPage = () => {
  return (
    <Container className="login-container">
      <div className="login-card">
        <FontAwesomeIcon icon={faUser} className="login-icon" />
        <h2 className="login-title">STUDENT ATTENDANCE SYSTEM</h2>
        <h4 className="login-title">Login Panel</h4>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Control
              className="login-input"
              name="username"
              type="text"
              placeholder="admin@mail.com"
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control
              className="login-input"
              type="password"
              name="password"
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
