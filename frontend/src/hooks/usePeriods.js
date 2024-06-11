import { useState, useEffect } from "react";
import ComAttApi from "../api";
import useDataManagement from "./useDataManagement";
import moment from "moment";

const usePeriods = () => {
  const {
    data,
    setData,
    addItem,
    removeItem,
    setLoading,
    loading,
    alert,
    closeAlert,
    setAlert,
  } = useDataManagement({
    endpoint: "periods",
  });

  const [currentSundaySchool, setCurrentSundaySchool] = useState();

  useEffect(() => {
    setLoading(true);
    const fetchPeriods = async () => {
      const fetchSundaySchool = await ComAttApi.getAll(
        "periods/currentSundayPeriods"
      );
      setCurrentSundaySchool(fetchSundaySchool);
    };
    fetchPeriods();
    setLoading(false);
  }, []);

  const takenAttendance = currentSundaySchool?.filter(
    (period) => period.attendanceTaken === true
  );

  const pendingAttendance = currentSundaySchool?.filter(
    (period) => period.attendanceTaken === false
  );

  const handleCopy = async (dates) => {
    try {
      setLoading(true);
      const sourceDate = moment(dates.sourceDate).format("MM-DD-YYYY");
      const targetDate = moment(dates.targetDate).format("MM-DD-YYYY");

      //filter periods by date and inster new target date to make object ready to copy
      const copyPeriods = data
        .filter(
          (period) => moment(period.date).format("MM-DD-YYYY") === sourceDate
        )
        .map((period) => {
          const { periodId, ...rest } = period;
          return { ...rest, date: targetDate };
        });

      const resp = await ComAttApi.create("periods/batch", copyPeriods);

      setData((prevData) => [...prevData, ...resp]);

      if (!copyPeriods.length)
        throw new Error(
          `Failed to copy periods from source date to target date.
          The selected source date does not have any periods.`
        );

      setAlert({
        visible: true,
        messages: [`Item added successfully.`],
        type: "success",
        title: "Success",
      });
    } catch (error) {
      setAlert({
        visible: true,
        messages: [error.message],
        type: "danger",
        title: "Oh snap! You got an error!",
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    addItem,
    removeItem,
    loading,
    alert,
    closeAlert,
    takenAttendance,
    pendingAttendance,
    handleCopy,
  };
};

export default usePeriods;
