import ComAttApi from "../api";
import useDataManagement from "./useDataManagement";

const useStudents = () => {
  return useDataManagement({
    endpoint: "students",
    idKey: "studentId",
  });
};

export default useStudents;
