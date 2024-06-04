import React, { useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { format } from "date-fns";
import useTerms from "../hooks/useTerms";
import GenericTable from "./CommonJsx/GenericTable";
import GenericForm from "./CommonJsx/GenericForm";
import LoadingSpinner from "./CommonJsx/LoadingSpinner";
import CustomAlert from "./CommonJsx/CustomAlert";

const TermManagement = () => {
  const {
    data,
    addItem: addTerm,
    removeItem: removeTerm,
    loading,
    alert,
    closeAlert,
  } = useTerms();

  //reshape the date
  const terms = data.map((term) => ({
    ...term,
    startDate: format(new Date(term.startDate), "MM-dd-yyyy"),
    endDate: format(new Date(term.endDate), "MM-dd-yyyy"),
  }));

  const termFields = [
    {
      name: "termName",
      label: "Term Name",
      type: "text",
      placehodler: "Enter term name",
      required: true,
    },
    {
      name: "startDate",
      label: "Start Date",
      type: "date",
      required: true,
    },
    {
      name: "endDate",
      label: "End Date",
      type: "date",
      required: true,
    },
  ];

  const termColumns = [
    { label: "Id", accessor: "termId" },
    { label: "Term", accessor: "termName" },
    { label: "Start Date", accessor: "startDate" },
    { label: "End Date", accessor: "endDate" },
  ];

  return (
    <div>
      <h1 className="mb-4">Terms</h1>
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
        <GenericForm
          title="Create Term"
          initialData={{ termName: "" }}
          fields={termFields}
          onSubmit={addTerm}
        />
        <GenericTable
          title="All Terms"
          columns={termColumns}
          data={terms}
          onDelete={(term) => {
            removeTerm(term.termId);
          }}
        />
      </Container>
    </div>
  );
};

export default TermManagement;
