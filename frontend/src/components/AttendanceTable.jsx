import React from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";

const AttendanceTable = ({
  handleSubmit,
  students,
  handleAttendanceChange,
  attendances,
  isAttendanceTaken,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ background: "white" }} className="pt-4 m-1 mt-5">
        <Col md={12}>
          <h6>Students for Selected Period</h6>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.studentId}>
                  <td>{student.studentId}</td>
                  <td>{student.firstName}</td>
                  <td>{student.lastName}</td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      label="Present"
                      checked={
                        attendances.find(
                          (att) => att.studentId === student.studentId
                        )?.status || false
                      }
                      onChange={() => handleAttendanceChange(student.studentId)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button
            type="submit"
            className="mb-2"
            variant={isAttendanceTaken ? "success" : "primary"}
          >
            {isAttendanceTaken ? "Update Attendance" : "Submit Attendance"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default AttendanceTable;
