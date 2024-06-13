import useDataManagement from "./useDataManagement";

/*
 *This custom hook simpliefes the Crud opearation of groups data
 */

const useGroups = () => {
  return useDataManagement({
    endpoint: "groups",
    idKey: "groupId",
  });
};

export default useGroups;
