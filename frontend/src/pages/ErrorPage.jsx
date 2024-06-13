import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import GoBack from "../components/CommonJsx/GoBack";

/**
 * General error page component to display error messages.
 */

const ErrorPage = ({
  errorCode = 500,
  errorMessage = "Something went wrong!",
}) => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Error {errorCode}</h1>
          <p>{errorMessage}</p>
          <GoBack useNavigateBack={true} />
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
