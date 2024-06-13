import useDataManagement from "./useDataManagement";

/*
*This custom hook simpliefes the Crud opearation of terms data
*/

const useTerms = () => {
  return useDataManagement({
    endpoint: "terms",
    idKey: "termId",
  });
};

export default useTerms;
