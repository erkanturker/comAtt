// src/hooks/useGroups.js
import useDataManagement from "./useDataManagement";
import ComAttApi from "../api";

const useGroups = () => {
  return useDataManagement({
    fetchFunction: ComAttApi.getGroups.bind(ComAttApi),
    createFunction: ComAttApi.createGroup.bind(ComAttApi),
    deleteFunction: ComAttApi.removeGroup.bind(ComAttApi),
    idKey: "groupId",
  });
};

export default useGroups;
