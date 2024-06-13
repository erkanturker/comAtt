import React from "react";
import { Container } from "react-bootstrap";
import useAttendanceAdmin from "../../hooks/useAttendanceAdmin";
import AttendanceTable from "../CommonJsx/AttendanceTable";
import CustomAlert from "../CommonJsx/CustomAlert";
import GoBack from "../CommonJsx/GoBack";
import LoadingSpinner from "../CommonJsx/LoadingSpinner";

/**
 * AttendanceAdmin Component
 *
 * This component manages and displays attendance information for a selected period.
 * It uses the useAttendanceAdmin hook to fetch and manage the attendance data.
 * The user can mark attendance for each student and submit or update the attendance status.
 */

const AttendanceAdmin = () => {
  const {
    period,
    students,
    attendances,
    loading,
    alert,
    handleAttendanceChange,
    handleSubmit,
    closeAlert,
  } = useAttendanceAdmin();

  return (
    <div>
      <Container fluid>
        {loading && <LoadingSpinner />}
        {alert.visible && (
          <CustomAlert
            type={alert.type}
            title={alert.title}
            messages={alert.messages}
            visible={alert.visible}
            onClose={closeAlert}
          />
        )}
        <h1 className="">
          {period?.attendanceTaken ? "Submitted" : "Pending"} Attendances
        </h1>
        <GoBack useNavigateBack={true} />
        <AttendanceTable
          students={students}
          attendances={attendances}
          handleAttendanceChange={handleAttendanceChange}
          handleSubmit={handleSubmit}
          isAttendanceTaken={period?.attendanceTaken}
        />
      </Container>
    </div>
  );
};

export default AttendanceAdmin;
