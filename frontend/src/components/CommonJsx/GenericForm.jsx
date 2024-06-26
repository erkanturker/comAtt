import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import useFormData from "../../hooks/useFormData";
import DatePicker from "react-datepicker";
import "./GenericForm.css";

/**
 * GenericForm Component
 *
 * This component renders a customizable form based on the provided fields.
 * It supports various input types including text, select, and date.
 */

const GenericForm = ({
  initialData,
  onSubmit,
  fields,
  submitButtonText = "Submit",
  title,
}) => {
  const [formData, handleChange, setFormData] = useFormData(initialData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData(initialData);
  };

  const handleDateChange = (date, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row style={{ background: "white" }} className="pt-3 m-1">
        <h6 className="mb-4">{title}</h6>
        {fields.map((field, index) => (
          <Col md={5} key={index}>
            <Form.Group controlId={field.name} className="mb-3 px-4">
              <Form.Label>
                {field.label} <span className="text-danger">*</span>
              </Form.Label>
              {field.type === "select" ? (
                <Form.Select
                  as="select"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  data-testid={field.name}
                >
                  <option value="">{field.placeholder}</option>
                  {field.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Select>
              ) : field.type === "date" ? (
                <div className="date-picker-container">
                  <DatePicker
                    id={field.name}
                    type="date"
                    selected={formData[field.name]}
                    onChange={(date) => handleDateChange(date, field.name)}
                    className="form-control"
                    aria-labelledby={`${field.name}-label`}
                    data-testid={field.name}
                  />
                </div>
              ) : (
                <Form.Control
                  type={field.type}
                  placeholder={field.placeholder}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  data-testid={field.name}
                />
              )}
            </Form.Group>
          </Col>
        ))}
        <Col md={12}>
          <Form.Group controlId="Button" className="mb-3 px-4">
            <Button variant="primary" type="submit" data-testid="submit">
              {submitButtonText}
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default GenericForm;
