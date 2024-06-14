import React from "react";
import { Container } from "react-bootstrap";
import LoadingSpinner from "./CommonJsx/LoadingSpinner";
import useSubject from "../hooks/useSubject";
import useUsers from "../hooks/useUsers";
import GenericForm from "./CommonJsx/GenericForm";
import GenericTable from "./CommonJsx/GenericTable";
import CustomAlert from "./CommonJsx/CustomAlert";

/**
 * SubjectManagement Component
 *
 * This component provides an interface for managing subjects. It allows
 * the creation and deletion of subjects, and displays a list of all subjects
 * in a table format.
 *
 * State:
 * - subjects: List of subjects.
 * - teachers: Filters the list of users to only include teachers.
 * - subjectFields: Defines the fields used in the GenericForm for subject creation.
 * - subjectColumns: Defines the columns used in the GenericTable for displaying subject data.
 *
 */

const SubjectManagement = () => {
  const {
    data: subjects,
    addItem: addSubject,
    removeItem: removeSubject,
    loading,
    alert,
    closeAlert,
  } = useSubject();

  const { data } = useUsers();

  const teachers = data.filter((user) => user.role === "teacher");

  const subjectFields = [
    {
      name: "subjectName",
      label: "Subject Name",
      type: "text",
      placeholder: "Enter First Name",
      required: true,
    },
    {
      name: "teacherId",
      label: "Teacher Name",
      type: "select",
      placeholder: "Select Teacher",
      required: true,
      options: teachers.map((teacher) => ({
        value: teacher.username,
        label: `${teacher.firstName} ${teacher.lastName}`,
      })),
    },
  ];

  const subjectColumns = [
    { label: "Id", accessor: "subjectId" },
    { label: "Subject", accessor: "subjectName" },
    { label: "Teacher", accessor: "teacherId" },
  ];

  return (
    <div>
      <h1 className="mb-4">Subjects</h1>
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
          title="Create Subject"
          initialData={{}}
          onSubmit={addSubject}
          fields={subjectFields}
          submitButtonText="Create Subject"
        />
        <GenericTable
          title="All Subjects"
          data={subjects}
          columns={subjectColumns}
          onDelete={(subject) => {
            removeSubject(subject.subjectId);
          }}
        />
      </Container>
    </div>
  );
};

export default SubjectManagement;
