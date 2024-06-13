import React from "react";
import useUsers from "../hooks/useUsers";
import GenericTable from "./CommonJsx/GenericTable";
import { Container, Spinner } from "react-bootstrap";
import GenericForm from "./CommonJsx/GenericForm";
import CustomAlert from "./CommonJsx/CustomAlert";

/**
 * UserManagement Component
 *
 * This component provides an interface for managing users. It allows
 * the creation and deletion of users, and displays a list of all users
 * in a table format.
 *  State:
 * - initialData: Initial state for the form data.
 * - userFields: Defines the fields used in the GenericForm for user creation.
 * - userColumns: Defines the columns used in the GenericTable for displaying user data.
 *
 */

const UserManagment = () => {
  const {
    data: users,
    addItem: addUser,
    removeItem: removeUser,
    loading,
    alert,
    closeAlert,
  } = useUsers();

  const userFields = [
    {
      name: "username",
      label: "Username",
      type: "text",
      placeholder: "Enter username",
      required: true,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      required: true,
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      required: true,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      placeholder: "Select role",
      required: true,
      options: [
        { value: "admin", label: "Admin" },
        { value: "teacher", label: "Teacher" },
      ],
    },
  ];

  const initialData = {
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  };

  const userColumns = [
    { label: "Username", accessor: "username" },
    { label: "First Name", accessor: "firstName" },
    { label: "Last Name", accessor: "lastName" },
    { label: "Email", accessor: "email" },
    { label: "Role", accessor: "role" },
  ];

  return (
    <div>
      <h1 className="mb-4">Users</h1>
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
          title="Create User"
          initialData={initialData}
          onSubmit={addUser}
          fields={userFields}
          submitButtonText="Create User"
        />
        <GenericTable
          title="All Users"
          columns={userColumns}
          data={users}
          onDelete={(user) => {
            removeUser(user.username);
          }}
        />
      </Container>
    </div>
  );
};

export default UserManagment;
