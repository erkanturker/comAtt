import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useFormData from "../hooks/useFormData";
import ComAttApi from "../api";

const CreateUserFrom = ({ onCreateUser }) => {
  const intialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  };
  const [formData, handleChange, setFormData] = useFormData(intialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await ComAttApi.createUser(formData);
      onCreateUser(newUser);
      setFormData(intialData);
    } catch (error) {
      console.error("There was an error creating the user!", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ background: "white" }} className="pt-3 m-1">
        <h6 className="mb-4">Create Users</h6>
        <Col md={5}>
          <Form.Group controlId="formUsername" className="mb-3 px-4">
            <Form.Label>
              Username <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              required
              name="username"
              onChange={handleChange}
              value={formData.username}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="formFirstName" className="mb-3 px-4">
            <Form.Label>
              Firstname <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter firstname"
              required
              name="firstName"
              onChange={handleChange}
              value={formData.firstName}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="formLastName" className="mb-3 px-4">
            <Form.Label>
              Lastname <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter lastname"
              required
              name="lastName"
              onChange={handleChange}
              value={formData.lastName}
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="formPassword" className="mb-3 px-4">
            <Form.Label>
              Password <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="formEmail" className="mb-3 px-4">
            <Form.Label>
              Email <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="formRoles" className="mb-3 px-4">
            <Form.Label>
              Select Roles <span className="text-danger">*</span>
            </Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleChange}
              name="role"
              value={formData.role}
              as="select"
            >
              <option> Select Roles</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={5}>
          <Form.Group controlId="Button" className="mb-3 px-4">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateUserFrom;
