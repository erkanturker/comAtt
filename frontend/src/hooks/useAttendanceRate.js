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
        console.log("Fetching term attendances...");
        const respTermAtt = await ComAttApi.getAll(
          "attendances/attendancesByCurrentTerm"
        );
        console.log("API Response:", respTermAtt);

        setTermAttendances(respTermAtt);
      } catch (error) {
        console.error("Error fetching term attendances:", error);
        console.error(error);
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
    const today = moment();
    console.log(`today ${today.format()}`);
    console.log(`Term Attendances:`, termAttendances);

    const sortedAttendanceByDate = termAttendances
      .map((att) => {
        const parsedDate = moment.utc(att.date);
        console.log(`Parsed Date: ${parsedDate.format()}`);
        return { ...att, date: moment(att.date) };
      })
      .filter((att) => att.date.isAfter(today, "day"))
      .sort((a, b) => a.date - b.date);

    console.log(`Sorted Attendance by Date:`, sortedAttendanceByDate);

    const currentSundayAttendace = sortedAttendanceByDate.find(
      (att) => att.date.day() === 0
    );

    if (!currentSundayAttendace) {
      return [];
    }

    console.log(`Current Sunday Attendance:`, currentSundayAttendace);

    const currentAttendance = termAttendances.filter((att) =>
      moment(att.date).isSame(currentSundayAttendace.date, "day")
    );

    console.log(`Current Attendance:`, currentAttendance);

    return termAttendances.filter((att) =>
      moment(att.date).isSame(currentSundayAttendace.date, "day")
    );
  };

  const currentAttendance = getCurrentSundaySchoolAttendances();
  const currentPresents = currentAttendance.filter(
    (att) => att.status === true
  );
  console.log(`current Present ${currentPresents.length}`);

  const currentRate = (
    currentAttendance?.length > 0
      ? (currentPresents.length / currentAttendance.length) * 100
      : 0
  ).toFixed(2);

  return { termAttendances, termRate, currentRate };
};

export default useAttendanceRate;
