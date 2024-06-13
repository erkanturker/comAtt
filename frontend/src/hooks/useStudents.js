import useDataManagement from "./useDataManagement";

/*
*This custom hook simpliefes the Crud opearation of students data
*/

const useStudents = () => {
  return useDataManagement({
    endpoint: "students",
    idKey: "studentId",
  });
};

export default useStudents;
