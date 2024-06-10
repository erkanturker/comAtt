import { useState, useEffect } from "react";
import ComAttApi from "../api";
import useDataManagement from "./useDataManagement";

const usePeriods = () => {
  const { data, addItem, removeItem, loading, alert, closeAlert } =
    useDataManagement({
      endpoint: "periods",
    });

  const [currentSundaySchool, setCurrentSundaySchool] = useState();

  useEffect(() => {
    const fetchPeriods = async () => {
      const fetchSundaySchool = await ComAttApi.getAll(
        "periods/currentSundayPeriods"
      );
      setCurrentSundaySchool(fetchSundaySchool);
    };
    fetchPeriods();
  }, []);

  const takenAttendance = currentSundaySchool?.filter(
    (period) => period.attendanceTaken === true
  );

  const pendingAttendance = currentSundaySchool?.filter(
    (period) => period.attendanceTaken === false
  );

  return {
    data,
    addItem,
    removeItem,
    loading,
    alert,
    closeAlert,
    takenAttendance,
    pendingAttendance,
  };
};

export default usePeriods;
