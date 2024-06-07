import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactSelect from "react-select";

const AttendancePeriodSelection = ({
  options,
  customStyles,
  handlePeriodSelect,
  selectedPeriodId,
}) => {
  return (
    <Form>
      <Row style={{ background: "white" }} className="pt-3 m-1">
        <h6 className="mb-4">Schedule</h6>
        <Col md={5}>
          <Form.Group controlId="schedule" className="mb-3 px-4">
            <Form.Label>Select a Period</Form.Label>
            <ReactSelect
              options={options}
              styles={customStyles}
              onChange={(selectedOption) =>
                handlePeriodSelect({
                  target: { value: selectedOption.value },
                })
              }
              value={options.find(
                (option) => option.value === selectedPeriodId
              )}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default AttendancePeriodSelection;
