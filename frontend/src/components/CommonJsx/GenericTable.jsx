import React from "react";
import { Button, Col, Row, Table } from "react-bootstrap";

/**
 * GenericTable Component
 *
 * This component renders a table with customizable columns and data. It supports optional row click actions
 * and delete buttons for each row. The title can be either a string or an array of strings for multi-line titles.
 *
 * Props:
 * - title (string | string[]): The title of the table. Can be a single string or an array of strings for multi-line titles.
 * - columns (Array): An array of objects defining the columns. Each object should have a 'label' and an 'accessor' property.
 * - data (Array): An array of objects representing the table data.
 * - onDelete (function): Function to call when the delete button is clicked for a row. Receives the row data as an argument.
 * - showDeleteButton (boolean): Whether to show the delete button for each row. Defaults to true.
 * - onRowClick (function): Function to call when a row is clicked. Receives the row data as an argument. Optional.
 * - theme (string): Theme for row styles. Can be 'default', 'remaining', or 'taken'. Defaults to 'default'.
 *
 * Usage:
 * <GenericTable
 *   title="Table Title"
 *   columns={[{ label: 'Column 1', accessor: 'col1' }, { label: 'Column 2', accessor: 'col2' }]}
 *   data={[{ col1: 'Data 1', col2: 'Data 2' }]}
 *   onDelete={(item) => console.log('Delete', item)}
 *   onRowClick={(item) => console.log('Row Clicked', item)}
 *   theme="remaining"
 * />
 */

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

  const renderTitle = () => {
    if (Array.isArray(title)) {
      return title.map((line, index) => <div key={index}>{line}</div>);
    }
    return <div>{title}</div>;
  };

  return (
    <Row style={{ background: "white" }} className="pt-4 m-1 mt-4">
      <Col md={12}>
        <h6>{renderTitle()}</h6>
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
