import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

const UserTable = ({ users, onDelete }) => {
  return (
    <Row style={{ background: "white" }} className="pt-4 m-1 mt-5">
      <Col md={12}>
        <h5>All Users</h5>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      onDelete(user.username);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default UserTable;
