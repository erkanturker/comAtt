import useDataManagement from "./useDataManagement";

const useUsers = () => {
  return useDataManagement({
    idKey: "username",
    endpoint: "users",
  });
};

export default useUsers;
