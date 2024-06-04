import ComAttApi from "../api";
import useDataManagement from "./useDataManagement";

const useStudents = () => {
  return useDataManagement({
    fetchFunction: ComAttApi.getStudents.bind(ComAttApi),
    createFunction: ComAttApi.createStudent.bind(ComAttApi),
    deleteFunction: ComAttApi.removeStudents.bind(ComAttApi),
    idKey: "studentId",
  });
};

export default useStudents;
