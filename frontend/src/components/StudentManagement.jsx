import React from "react";
import useGroups from "../hooks/useGroups";
import useStudents from "../hooks/useStudents";
import GenericForm from "./CommonJsx/GenericForm";
import { Container, Spinner } from "react-bootstrap";
import CustomAlert from "./CommonJsx/CustomAlert";
import GenericTable from "./CommonJsx/GenericTable";

/**
 * StudentManagement Component
 *
 * This component provides an interface for managing students. It allows
 * the creation and deletion of students, and displays a list of all students
 * in a table format.
 *
 * State:
 * - students: List of students.
 * - groups: List of groups to populate the group selection dropdown.
 * - initialData: Initial state for the student form data.
 * - studentFields: Defines the fields used in the GenericForm for student creation.
 * - studentColumns: Defines the columns used in the GenericTable for displaying student data.
 *
 */

const StudentManagement = () => {
  const {
    data: students,
    addItem: addStudent,
    removeItem: removeStudent,
    loading,
    alert,
    closeAlert,
  } = useStudents();
  const { data: groups } = useGroups();

  const initialData = {
    groupId: "",
    firstName: "",
    lastName: "",
    age: "",
    parentFirstName: "",
    parentLastName: "",
    parentPhone: "",
    parentEmail: "",
  };

  const studentFields = [
    {
      name: "groupId",
      label: "Group Name",
      type: "select",
      placeholder: "Select Group",
      required: true,
      options: groups.map((group) => ({
        value: group.groupId,
        label: group.groupName,
      })),
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter First Name",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter Last Name",
      required: true,
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter Age",
      required: false,
    },
    {
      name: "parentFirstName",
      label: "Parent First Name",
      type: "text",
      placeholder: "Enter Parent First Name",
      required: true,
    },
    {
      name: "parentLastName",
      label: "Parent Last Name",
      type: "text",
      placeholder: "Enter Parent Last Name",
      required: true,
    },
    {
      name: "parentPhone",
      label: "Parent Phone",
      type: "tel",
      placeholder: "Enter Parent Phone",
      pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}",
      required: true,
    },
    {
      name: "parentEmail",
      label: "Parent Email",
      type: "email",
      placeholder: "Enter Parent Email",
      required: true,
    },
  ];

  const studentColumns = [
    { label: "Id", accessor: "studentId" },
    { label: "Group", accessor: "groupId" },
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "Parent Name", accessor: "parentFirstName" },
    { label: "Parent Phone", accessor: "parentPhone" },
    { label: "Parent Email", accessor: "parentEmail" },
  ];

  return (
    <div>
      <h1 className="mb-4">Students</h1>
      <Container fluid>
        {loading && <Spinner />}
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
          title="Create Student"
          initialData={initialData}
          onSubmit={addStudent}
          fields={studentFields}
          submitButtonText="Create Student"
        />
        <GenericTable
          title="All Students"
          columns={studentColumns}
          data={students}
          onDelete={(student) => {
            removeStudent(student.studentId);
          }}
        />
      </Container>
    </div>
  );
};

export default StudentManagement;
