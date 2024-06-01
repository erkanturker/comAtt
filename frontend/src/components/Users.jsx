// src/components/Users.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import CreateUserFrom from "./CreateUserFrom";
import UserTable from "./UserTable";
import ComAttApi from "../api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await ComAttApi.getAllUsers();
        setUsers(response);
      } catch (error) {
        console.error("There was an error fetching the users!", error);
      }
    };
    fetchUsers();
  }, []);

  const createUser = (user) => {
    setUsers([...users, user]);
  };

  return (
    <div>
      <h1 className="mb-4">Users</h1>
      <Container fluid>
        <CreateUserFrom onCreateUser={createUser} />
        <UserTable users={users} />
      </Container>
    </div>
  );
};

export default Users;
