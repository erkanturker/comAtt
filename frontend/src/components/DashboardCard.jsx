import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

/**
 * DashboardCard Component
 *
 * This component renders a card with a title, count, and an icon, which links to a specified path.
 *
 * Props:
 * - title (string): The title of the card.
 * - count (number | string): The count or value to be displayed on the card.
 * - icon (object): The FontAwesomeIcon to be displayed.
 * - color (string): The color class for the icon.
 * - type (string, optional): The type of value, either "number" or "percent". Defaults to "number".
 * - link (string, optional): The URL path the card links to. Defaults to "#".
 *
 * Usage:
 * <DashboardCard
 *   title="Done"
 *   count={10}
 *   icon={faCheck}
 *   color="text-success"
 *   link="/attendances"
 * />
 */

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
