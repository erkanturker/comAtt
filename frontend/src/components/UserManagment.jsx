import React from "react";
import useUsers from "../hooks/useUsers";
import GenericTable from "./CommonJsx/GenericTable";
import { Container, Spinner } from "react-bootstrap";
import GenericForm from "./CommonJsx/GenericForm";
import CustomAlert from "./CommonJsx/CustomAlert";

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
        { value: "user", label: "User" },
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