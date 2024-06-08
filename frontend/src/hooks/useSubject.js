import React from "react";
import useDataManagement from "./useDataManagement";
import ComAttApi from "../api";

const useSubject = () => {
  return useDataManagement({
    endpoint: "subjects",
    idKey: "subjectId",
  });
};

export default useSubject;
