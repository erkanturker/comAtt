import ComAttApi from "../api";
import useDataManagement from "./useDataManagement";

const useTerms = () => {
  return useDataManagement({
    fetchFunction: ComAttApi.getTerms.bind(ComAttApi),
    createFunction: ComAttApi.createTerm.bind(ComAttApi),
    deleteFunction: ComAttApi.removeTerm.bind(ComAttApi),
    idKey: "termId",
  });
};

export default useTerms;
