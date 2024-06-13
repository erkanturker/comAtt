import React from "react";
import { Spinner } from "react-bootstrap";

/** Loading message used by components that fetch API data. */

function LoadingSpinner() {
  return (
    <div className="row justify-content-center">
      <div className="col-md-4 text-center">
        <div className="mb-1">
          <Spinner
            style={{
              width: "5rem",
              height: "5rem",
            }}
            className="spinner-border-lg"
            animation="border"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
