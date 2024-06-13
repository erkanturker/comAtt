import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

/**
 * GoBack Component
 *
 * This component renders a "Go Back" link that can either navigate to a specified link
 * or use the browser's history to go back to the previous page.
 */

const GoBack = ({ link, useNavigateBack }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (useNavigateBack) {
      navigate(-1);
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
