import useDataManagement from "./useDataManagement";

/*
 *This custom hook simpliefes the Crud opearation of term data
 */

const useSubject = () => {
  return useDataManagement({
    endpoint: "subjects",
    idKey: "subjectId",
  });
};

export default useSubject;
