import useDataManagement from "./useDataManagement";

/*
*This custom hook simpliefes the Crud opearation of users data
*/

const useUsers = () => {
  return useDataManagement({
    idKey: "username",
    endpoint: "users",
  });
};

export default useUsers;
