import moment from "moment";
import { useEffect, useState } from "react";
import ComAttApi from "../api";

/**
 * useAttendanceRate Hook
 *
 * This custom hook manages the attendance rates for the current term and current Sunday school periods.
 * It fetches attendance data for the current term and calculates the overall term attendance rate and
 * the attendance rate for the next Sunday.
 */

const useAttendanceRate = () => {
  const [termAttendances, setTermAttendances] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTermAttendances = async () => {
      try {
        console.log("Fetching term attendances...");
        const respTermAtt = await ComAttApi.getAll(
          "attendances/attendancesByCurrentTerm"
        );
        console.log("API Response:", respTermAtt);
        setTermAttendances(respTermAtt);
      } catch (error) {
        console.error("Error fetching term attendances:", error);
        setError(error);
      }
    };

    fetchTermAttendances();
  }, []);

  useEffect(() => {
    console.log("Today:", moment().utc().format());
    console.log("Term Attendances:", termAttendances);
  }, [termAttendances]);

  const presents = termAttendances?.filter((att) => att.status === true).length;
  const termRate = (
    termAttendances?.length > 0 ? (presents / termAttendances.length) * 100 : 0
  ).toFixed(2);

  const getCurrentSundaySchoolAttendances = () => {
    const today = moment().utc();
    console.log(`Today: ${today.format()}`);

    const sortedAttendanceByDate = termAttendances
      .map((att) => ({
        ...att,
        date: moment.utc(att.date),
      }))
      .filter((att) => att.date.isAfter(today, "day"))
      .sort((a, b) => a.date - b.date);

    console.log("Sorted Attendance by Date:", sortedAttendanceByDate);

    const currentSundayAttendace = sortedAttendanceByDate.find(
      (att) => att.date.day() === 0
    );

    console.log("Current Sunday Attendance:", currentSundayAttendace);

    if (!currentSundayAttendace) {
      return [];
    }

    return termAttendances.filter((att) =>
      moment.utc(att.date).isSame(currentSundayAttendace.date, "day")
    );
  };

  const currentAttendance = getCurrentSundaySchoolAttendances();
  const currentPresents = currentAttendance.filter(
    (att) => att.status === true
  ).length;
  console.log(`Current Present: ${currentPresents}`);

  const currentRate = (
    currentAttendance?.length > 0
      ? (currentPresents / currentAttendance.length) * 100
      : 0
  ).toFixed(2);

  return { termAttendances, termRate, currentRate, error };
};

export default useAttendanceRate;
