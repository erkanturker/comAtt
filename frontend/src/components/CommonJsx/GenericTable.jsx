import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

const GenericTable = ({
  title,
  columns,
  data,
  onDelete,
  showDeleteButton = true,
  onRowClick,
  theme = "default",
}) => {
  const getRowStyle = () => {
    switch (theme) {
      case "remaining":
        return { color: "red" };
      case "taken":
        return { color: "green" };
      default:
        return {};
    }
  };
  return (
    <Row style={{ background: "white" }} className="pt-4 m-1 mt-4">
      <Col md={12}>
        <h6>{title}</h6>
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
              {showDeleteButton && <th>Action</th>}
            </tr>
          </thead>
          <tbody className="text-danger">
            {data.map((item, rowIndex) => (
              <tr
                className="text-danger"
                key={rowIndex}
                onClick={() => onRowClick && onRowClick(item)}
                style={{
                  cursor: onRowClick ? "pointer" : "default",
                }}
              >
                {columns.map((column, colIndex) => (
                  <td style={getRowStyle()} key={colIndex}>
                    {item[column.accessor]}
                  </td>
                ))}
                {showDeleteButton && (
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(item);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default GenericTable;
