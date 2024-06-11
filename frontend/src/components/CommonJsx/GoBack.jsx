import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const GoBack = ({ link, useNavigateBack }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (useNavigateBack) {
      navigate(-1); // Navigate back to the previous page
    }
  };

  return (
    <div
      onClick={useNavigateBack ? handleBackClick : null}
      className="mb-3 d-flex align-items-center text-primary"
      style={{ cursor: "pointer" }}
    >
      <FontAwesomeIcon icon={faArrowLeft} className="px-2" />
      {useNavigateBack ? (
        <span>Go Back</span>
      ) : (
        <NavLink to={link}>Go Back to Dashboard</NavLink>
      )}
    </div>
  );
};

export default GoBack;
