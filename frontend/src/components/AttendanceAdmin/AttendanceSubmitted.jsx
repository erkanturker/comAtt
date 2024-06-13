import React from "react";
import { useNavigate } from "react-router-dom";
import usePeriods from "../../hooks/usePeriods";
import GenericTable from "../CommonJsx/GenericTable";
import LoadingSpinner from "../CommonJsx/LoadingSpinner";
import moment from "moment";
import GoBack from "../CommonJsx/GoBack";

/**
 * AttendanceSubmitted Component
 *
 * This component displays the submitted attendances in a table format.
 * It fetches the taken attendances using the usePeriods hook and displays them using the GenericTable component.
 * The user can click on a row to navigate to the detailed view of the selected period.
 */

const AttendanceSubmitted = () => {
  const { takenAttendance = [], loading } = usePeriods();
  const navigate = useNavigate();

  const columns = [
    { label: "Period", accessor: "periodNumber" },
    { label: "Group", accessor: "groupName" },
    { label: "Subject", accessor: "subjectName" },
    { label: "Date", accessor: "date" },
  ];

  return (
    <div>
      <h1>Submitted Attendances</h1>
      {loading && <LoadingSpinner />}
      <GoBack link="/dashboard/admin" />
      <GenericTable
        title="Select Attendances"
        data={takenAttendance
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
        theme="taken"
      />
    </div>
  );
};

export default AttendanceSubmitted;
