import React, { useEffect, useState } from "react";
import ComAttApi from "../api";

const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    messages: [],
    type: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const users = await ComAttApi.getAllUsers();
        setUsers(users);
      } catch (error) {
        setAlert({
          visible: true,
          messages: ["There was an error fetching the users!"],
          type: "danger",
          title: "Oh snap! You got an error!",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const addUser = async (user) => {
    try {
      setLoading(true);
      const newUser = await ComAttApi.createUser(user);
      setUsers((prevUsers) => [...prevUsers, newUser]);

      setAlert({
        visible: true,
        messages: [
          `${user.firstName} ${user.lastName} created as ${user.role}`,
        ],
        type: "success",
        title: "Success",
      });
    } catch (error) {
      setAlert({
        visible: true,
        messages: error,
        type: "danger",
        title: '"Oh snap! You got an error!',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (username) => {
    setLoading(true);
    try {
      await ComAttApi.removeUser(username);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.username !== username)
      );

      setAlert({
        visible: true,
        messages: [`User with username ${username} has been removed`],
        type: "info",
        title: "Info",
      });
    } catch (error) {
      setAlert({
        visible: true,
        messages: error,
        type: "danger",
        title: '"Oh snap! You got an error!',
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setAlert({
      ...alert,
      visible: false,
    });
  };

  return { users, addUser, removeUser, alert, closeAlert, loading };
};

export default useUsers;
