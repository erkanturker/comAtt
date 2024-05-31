// src/components/Sidebar.jsx
import React from "react";
import { Nav, NavLink } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faTachometerAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

function Sidebar({ isOpen }) {
  const { logout } = useAuth();
  return (
    <div
      className={`bg-light border-right sidebar ${isOpen ? "" : "collapsed"}`}
    >
      <div className="sidebar-header p-4">
        <h3>ComAtt</h3>
      </div>
      <Nav className="flex-column">
        <Nav.Link
          href="#"
          className="d-flex align-items-center my-2 border-bottom"
        >
          <FontAwesomeIcon icon={faTachometerAlt} className="px-2" />
          Dashboard
        </Nav.Link>
        <Nav.Link
          href="#"
          className="d-flex align-items-center my-1 border-bottom"
        >
          <FontAwesomeIcon icon={faUsers} className="px-2" />
          Users
        </Nav.Link>
        <Nav.Link
          href="#"
          className="d-flex align-items-center my-1 border-bottom"
          as={NavLink}
          onClick={logout}
        >
          <FontAwesomeIcon icon={faPowerOff} className="px-2" />
          Logout
        </Nav.Link>
      </Nav>
    </div>
  );
}

export default Sidebar;
