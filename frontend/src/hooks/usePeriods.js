import useDataManagement from "./useDataManagement";

const usePeriods = () => {
  return useDataManagement({
    endpoint: "periods",
  });
};

export default usePeriods;
