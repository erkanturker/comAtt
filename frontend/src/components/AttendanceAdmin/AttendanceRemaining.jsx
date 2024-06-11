import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import usePeriods from "../../hooks/usePeriods";
import GenericTable from "../CommonJsx/GenericTable";
import GoBack from "../CommonJsx/GoBack";
import LoadingSpinner from "../CommonJsx/LoadingSpinner";
const AttendanceRemaining = () => {
  const { pendingAttendance = [], loading } = usePeriods();

  const navigate = useNavigate();

  const columns = [
    { label: "Period", accessor: "periodNumber" },
    { label: "Group", accessor: "groupName" },
    { label: "Subject", accessor: "subjectName" },
    { label: "Date", accessor: "date" },
  ];

  return (
    <div>
      <h1>Remaining Attendances</h1>
      {loading && <LoadingSpinner />}
      <GoBack link="/dashboard" />
      <GenericTable
        title="Select Attendances"
        data={pendingAttendance
          .sort((a, b) => a.periodNumber - b.periodNumber)
          .map((period) => ({
            ...period,
            date: moment(period.date).format("MM-DD-YYYY"),
          }))}
        columns={columns}
        showDeleteButton={false}
        onRowClick={(item) => {
          navigate(`${item.periodId}`);
        }}
        theme="remaining"
      />
    </div>
  );
};

export default AttendanceRemaining;
