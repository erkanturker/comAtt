// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPowerOff,
  faTachometerAlt,
  faUsers,
  faUsersLine,
  faUserGraduate,
  faCloudSun,
  faChalkboard,
  faCalendarDays,
  faClipboardList,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../contexts/AuthContext";

/**
 * Sidebar component
 * This component renders a sidebar navigation menu. It displays different links based on the user's role.
 * Admin users see links for dashboard, users, groups, students, terms, subjects, periods, and reports.
 * Teacher users see links for the dashboard and attendance.
 * All users have a logout option.
 */

function Sidebar({ isOpen }) {
  const { logout, currentUser } = useAuth();
  return (
    <div
      className={`bg-light border-right sidebar ${isOpen ? "" : "collapsed"}`}
    >
      <div className="sidebar-header p-4">
        <h3>ComAtt</h3>
      </div>
      <Nav className="flex-column">
        {currentUser.role === "admin" && (
          <>
            {" "}
            <Nav.Link
              as={NavLink}
              to="/dashboard/admin"
              className="d-flex align-items-center my-2 border-bottom"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="px-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/users"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon icon={faUsers} className="px-2" />
              Users
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/groups"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon icon={faUsersLine} className="px-2" />
              Groups
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/students"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon icon={faUserGraduate} className="px-2" />
              Students
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/terms"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon icon={faCloudSun} className="px-2" />
              Terms
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/subjects"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon icon={faChalkboard} className="px-2" />
              Subjects
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/periods"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon icon={faCalendarDays} className="px-2" />
              Periods
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/report"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon
                icon={faClipboardList}
                size="lg"
                className="px-2"
              />
              Report
            </Nav.Link>
          </>
        )}
        {currentUser.role === "teacher" && (
          <>
            <Nav.Link
              as={NavLink}
              to="/dashboard/teacher"
              className="d-flex align-items-center my-2 border-bottom"
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="px-2" />
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/attendances"
              className="d-flex align-items-center my-1 border-bottom"
            >
              <FontAwesomeIcon icon={faCalendarDays} className="px-2" />
              Attendance
            </Nav.Link>
          </>
        )}
        <Nav.Link
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
