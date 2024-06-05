import React from "react";
import useDataManagement from "./useDataManagement";
import ComAttApi from "../api";

const usePeriods = () => {
  return useDataManagement({
    fetchFunction: ComAttApi.getPeriods.bind(ComAttApi),
    createFunction: ComAttApi.createPeriods.bind(ComAttApi),
  });
};

export default usePeriods;
