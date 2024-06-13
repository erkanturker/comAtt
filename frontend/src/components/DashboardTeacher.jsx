import React from "react";
import { Row } from "react-bootstrap";
import DashboardCard from "./DashboardCard";
import { faCheck, faHourglass } from "@fortawesome/free-solid-svg-icons";
import useAttendanceTeacher from "../hooks/useAttendanceTeacher";
import LoadingSpinner from "./CommonJsx/LoadingSpinner";

/**
 * DashboardTeacher Component
 * This component renders the teacher's dashboard, displaying the count of
 * remaining and submitted attendance for the current week.
 */

const DashboardTeacher = () => {
  const {
    remainingAttendance = [],
    submittedAttendances = [],
    loading,
  } = useAttendanceTeacher();

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <h1>Dashboard</h1>
      <Row>
        <h6 className="mt-4 mb-2">Current Week Attendace</h6>

        <DashboardCard
          title="Done"
          count={submittedAttendances.length}
          icon={faCheck}
          color="text-success"
          link="/attendances"
        />

        <DashboardCard
          title="Remaining"
          count={remainingAttendance.length}
          icon={faHourglass}
          color="text-danger"
          link="/attendances"
        />
      </Row>
    </div>
  );
};

export default DashboardTeacher;
