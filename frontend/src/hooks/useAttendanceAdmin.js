import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import ComAttApi from "../api";

/**
 * useAttendanceAdmin Hook
 *
 * This custom hook is designed to manage attendance data for the admin. It handles fetching
 * students, attendance records, and period information for a given period. It also provides
 * functions for changing attendance statuses and submitting updated attendance data.
 */

const useAttendanceAdmin = () => {
  const { periodId } = useParams();
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [period, setPeriod] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    messages: "",
    type: "success",
    title: "",
  });

  useEffect(() => {
    const fetchStudent = async () => {
      setLoading(true);

      try {
        const respStudents = await ComAttApi.getAll(
          `periods/${periodId}/students`
        );
        const respPeriod = await ComAttApi.get(`periods/${periodId}`);
        setPeriod(respPeriod);
        setStudents(respStudents);
        if (respPeriod.attendanceTaken) {
          const respPeriodAttendance = await ComAttApi.getAll(
            `attendances/${periodId}/periodAttendance`
          );

          setAttendances(
            respPeriodAttendance.map((attendance) => ({
              studentId: attendance.studentId,
              status: attendance.status,
            }))
          );
        } else {
          setAttendances(
            respStudents.map((student) => ({
              studentId: student.studentId,
              status: false,
            }))
          );
        }
      } catch (error) {
        setAlert({
          visible: true,
          messages: [
            `There was an error fetching the schedule: ${error.message}`,
          ],
          type: "danger",
          title: "Error",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [periodId]);

  const handleAttendanceChange = (studentId) => {
    setAttendances((prevData) =>
      prevData.map((attendance) =>
        attendance.studentId === studentId
          ? { ...attendance, status: !attendance.status }
          : attendance
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const date = moment().format("MM-DD-YYYY");

      let resp;

      const attTaken = period.attendanceTaken;

      if (!attTaken) {
        resp = await ComAttApi.create(
          `attendances/${period.periodId}/periodAttendance`,
          { date, attendances }
        );
        setPeriod((prevData) => ({ ...prevData, attendanceTaken: true }));
      } else {
        resp = await ComAttApi.patch(
          `attendances/${period.periodId}/updatePeriodAttendance`,
          { date, attendances }
        );

        setAlert({
          visible: true,
          messages: [`${resp.message}`],
          type: "success",
          title: "Success",
        });
      }
    } catch (error) {
      setAlert({
        visible: true,
        messages: [`There was an error removing the item: ${error.message}`],
        type: "danger",
        title: "Error",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeAlert = () => {
    setAlert({
      ...alert,
      visible: false,
    });
  };

  return {
    period,
    students,
    attendances,
    loading,
    alert,
    handleAttendanceChange,
    handleSubmit,
    closeAlert,
  };
};

export default useAttendanceAdmin;
