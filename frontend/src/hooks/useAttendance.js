import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ComAttApi from "../api";
import moment from "moment/moment";

const useAttendance = () => {
  const { currentUser } = useAuth();
  const [teacherSchedule, setTeacherSchedule] = useState([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState("");
  const [students, setStudents] = useState([]);
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    visible: false,
    messages: "",
    type: "success",
    title: "",
  });

  const isAttTaken = (periodId) => {
    return teacherSchedule.find((schedule) => schedule.periodId === periodId)
      ?.attendanceTaken;
  };

  // Fetch all current teacher schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const resp = await ComAttApi.getAll(
          `periods/${currentUser.username}/upcoming-schedule`
        );
        setTeacherSchedule(resp);
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

    if (currentUser) {
      fetchSchedule();
    }
  }, [currentUser]); // Added currentUser to the dependency array

  //show students as soon as teacher select the period

  const handlePeriodSelect = async (e) => {
    setLoading(true);
    try {
      const periodId = e.target.value;

      const respStudents = await ComAttApi.getAll(
        `periods/${periodId}/students`
      );
      setStudents(respStudents);
      setSelectedPeriodId(periodId);

      const attTaken = isAttTaken(periodId);
      console.log(attTaken);

      if (attTaken) {
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
        messages: error,
        type: "danger",
        title: "Oh snap! You got an error!",
      });
    } finally {
      setLoading(false);
    }
  };

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

      const attTaken = isAttTaken(selectedPeriodId);

      if (!attTaken)
        resp = await ComAttApi.create(
          `attendances/${selectedPeriodId}/periodAttendance`,
          { date, attendances }
        );
      else {
        resp = await ComAttApi.patch(
          `attendances/${selectedPeriodId}/updatePeriodAttendance`,
          { date, attendances }
        );
      }

      setTeacherSchedule((prevData) =>
        prevData.map((schedule) =>
          schedule.periodId === selectedPeriodId
            ? { ...schedule, attendanceTaken: true }
            : schedule
        )
      );

      setAlert({
        visible: true,
        messages: [`${resp.message}`],
        type: "success",
        title: "Success",
      });
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
    teacherSchedule,
    selectedPeriodId,
    students,
    attendances,
    handlePeriodSelect,
    handleAttendanceChange,
    handleSubmit,
    loading,
    alert,
    closeAlert,
  };
};

export default useAttendance;
