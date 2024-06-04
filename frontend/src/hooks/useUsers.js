import React, { useEffect, useState } from "react";
import ComAttApi from "../api";
import useDataManagement from "./useDataManagement";

const useUsers = () => {
  return useDataManagement({
    fetchFunction: ComAttApi.getAllUsers.bind(ComAttApi),
    createFunction: ComAttApi.createUser.bind(ComAttApi),
    deleteFunction: ComAttApi.removeUser.bind(ComAttApi),
  });
};

export default useUsers;
