import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const DashboardCard = ({
  title,
  count,
  icon,
  color,
  type = "number",
  link = "#",
}) => {
  return (
    <Col xs="12" md="6" lg="4" xl="3">
      <Card className="mb-4 shadow-sm rounded">
        <Card.Body>
          <Link to={link} className="text-decoration-none">
            <Row className="d-flex justify-content-between align-items-center">
              <Col xs={6} className="d-flex flex-column">
                <Card.Title
                  style={{
                    color: "#6c757d",
                    fontSize: "1.25rem",
                  }}
                >
                  {title}
                </Card.Title>
                <Card.Text style={{ color: "#6c757d" }}>
                  {type === "percent" ? `% ${count}` : count}
                </Card.Text>
              </Col>
              <Col xs={6} className="d-flex justify-content-end">
                <FontAwesomeIcon icon={icon} size="2xl" className={color} />
              </Col>
            </Row>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DashboardCard;