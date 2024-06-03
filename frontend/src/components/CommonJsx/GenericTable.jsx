import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

const GenericTable = ({ title, columns, data, onDelete }) => {
  return (
    <Row style={{ background: "white" }} className="pt-4 m-1 mt-5">
      <Col md={12}>
        <h6>{title}</h6>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{item[column.accessor]}</td>
                ))}
                <td>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(item)}
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

export default GenericTable;
