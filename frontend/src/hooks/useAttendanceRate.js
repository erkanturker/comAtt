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

  useEffect(() => {
    const fetchTermAttendances = async () => {
      try {
        const respTermAtt = await ComAttApi.getAll(
          "attendances/attendancesByCurrentTerm"
        );
        setTermAttendances(respTermAtt);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTermAttendances();
  }, []);

  const presents = termAttendances?.filter((att) => att.status === true).length;
  const termRate = (
    termAttendances?.length > 0 ? (presents / termAttendances.length) * 100 : 0
  ).toFixed(2);

  const getCurrentSundaySchoolAttendances = () => {
    const today = moment();

    const sortedAttendanceByDate = termAttendances
      .map((att) => ({
        ...att,
        date: moment(att.date),
      }))
      .filter((att) => att.date.isAfter(today, "day"))
      .sort((a, b) => a.date - b.date);

    const currentSundayAttendace = sortedAttendanceByDate.find(
      (att) => att.date.day() === 0
    );

    if (!currentSundayAttendace) {
      return [];
    }

    return termAttendances.filter((att) =>
      moment(att.date).isSame(currentSundayAttendace.date, "day")
    );
  };

  const currentAttendance = getCurrentSundaySchoolAttendances();
  const currentPresents = currentAttendance.filter(
    (att) => att.status === true
  );

  const currentRate = (
    currentAttendance?.length > 0
      ? (currentPresents.length / currentAttendance.length) * 100
      : 0
  ).toFixed(2);

  return { termAttendances, termRate, currentRate };
};

export default useAttendanceRate;
