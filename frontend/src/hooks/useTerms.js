import ComAttApi from "../api";
import useDataManagement from "./useDataManagement";

const useTerms = () => {
  return useDataManagement({
    endpoint: "terms",
    idKey: "termId",
  });
};

export default useTerms;
