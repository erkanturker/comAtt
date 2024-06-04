import React from "react";
import useDataManagement from "./useDataManagement";
import ComAttApi from "../api";

const useSubject = () => {
  return useDataManagement({
    fetchFunction: ComAttApi.getSubjects.bind(ComAttApi),
    createFunction: ComAttApi.createSubject.bind(ComAttApi),
    deleteFunction: ComAttApi.removeSubject.bind(ComAttApi),
    idKey: "subjectId",
  });
};

export default useSubject;
