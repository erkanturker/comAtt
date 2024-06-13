import { format } from "date-fns";
import React from "react";
import { Container } from "react-bootstrap";
import useTerms from "../hooks/useTerms";
import CustomAlert from "./CommonJsx/CustomAlert";
import GenericForm from "./CommonJsx/GenericForm";
import GenericTable from "./CommonJsx/GenericTable";
import LoadingSpinner from "./CommonJsx/LoadingSpinner";

/**
 * TermManagement Component
 *
 * This component provides an interface for managing terms. It allows
 * the creation and deletion of terms, and displays a list of all terms
 * in a table format.
 *
 * State:
 * - terms: Reformats the date fields for the terms.
 * - termFields: Defines the fields used in the GenericForm for term creation.
 * - termColumns: Defines the columns used in the GenericTable for displaying term data.
 *
 */

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
      placeholder: "Enter term name",
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
