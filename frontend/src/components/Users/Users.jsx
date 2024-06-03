// src/components/Users.jsx
import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import CreateUserFrom from "./CreateUserFrom";
import UserTable from "./UserTable";
import ComAttApi from "../../api";
import useUsers from "../../hooks/useUsers";
import CustomAlert from "../CommonJsx/CustomAlert";

const Users = () => {
  const { users, addUser, removeUser, loading, alert, closeAlert } = useUsers();

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
        <CreateUserFrom onCreateUser={addUser} />
        <UserTable users={users} onDelete={removeUser} />
      </Container>
    </div>
  );
};

export default Users;
