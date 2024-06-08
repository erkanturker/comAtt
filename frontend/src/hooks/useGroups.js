// src/hooks/useGroups.js
import useDataManagement from "./useDataManagement";

const useGroups = () => {
  return useDataManagement({
    endpoint: "groups",
    idKey: "groupId",
  });
};

export default useGroups;
