import React from "react";
import usePeriods from "../hooks/usePeriods";

const AttendanceManagement = () => {
  // let get next first group
  const { data: periods } = usePeriods();

  return <div>Attendance</div>;
};

export default AttendanceManagement;
