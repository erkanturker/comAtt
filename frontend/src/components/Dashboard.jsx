// src/components/Dashboard.jsx
import React from "react";
import { Card, Row, Col } from "react-bootstrap";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Users</Card.Title>
              <Card.Text>1,200</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Revenue</Card.Title>
              <Card.Text>$34,000</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Orders</Card.Title>
              <Card.Text>2,500</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
