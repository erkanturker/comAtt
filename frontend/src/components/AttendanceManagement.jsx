import React from "react";
import { Container } from "react-bootstrap";
import useAttendance from "../hooks/useAttendance";
import AttendancePeriodSelection from "./AttendancePeriodSelection";
import AttendanceTable from "./AttendanceTable";
import CustomAlert from "./CommonJsx/CustomAlert";
import LoadingSpinner from "./CommonJsx/LoadingSpinner";

const AttendanceManagement = () => {
  const {
    teacherSchedule,
    selectedPeriodId,
    students,
    attendances,
    handlePeriodSelect,
    handleAttendanceChange,
    handleSubmit,
    loading,
    alert,
    closeAlert,
  } = useAttendance();

  const options = teacherSchedule.map((schedule) => ({
    value: schedule.periodId,
    label: `Period ${schedule.periodNumber} - ${schedule.groupName} (${
      schedule.attendanceTaken ? "Attendance Taken" : "Attendance Pending"
    })`,
    color: schedule.attendanceTaken ? "green" : "red",
  }));

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.data.color,
      backgroundColor: state.isSelected ? "#dff0d8" : provided.backgroundColor,
    }),
  };
  
  return (
    <div>
      <h1 className="mb-4">Attendances</h1>
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
        <AttendancePeriodSelection
          options={options}
          customStyles={customStyles}
          handlePeriodSelect={handlePeriodSelect}
          selectedPeriodId={selectedPeriodId}
        />

        {selectedPeriodId && (
          <AttendanceTable
            students={students}
            attendances={attendances}
            handleAttendanceChange={handleAttendanceChange}
            handleSubmit={handleSubmit}
            isAttendanceTaken={
              teacherSchedule.find(
                (schedule) => schedule.periodId === selectedPeriodId
              )?.attendanceTaken
            }
          />
        )}
      </Container>
    </div>
  );
};

export default AttendanceManagement;
