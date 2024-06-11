// src/components/Dashboard.jsx
import {
  faBookAtlas,
  faChartBar,
  faChartPie,
  faCheck,
  faCloudSun,
  faGraduationCap,
  faHourglass,
  faPersonChalkboard,
  faUsersLine,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Row } from "react-bootstrap";
import useAttendanceRate from "../hooks/useAttendanceRate";
import useGroups from "../hooks/useGroups";
import usePeriods from "../hooks/usePeriods";
import useStudents from "../hooks/useStudents";
import useSubjects from "../hooks/useSubject";
import useTerms from "../hooks/useTerms";
import useUsers from "../hooks/useUsers";
import DashboardCard from "./DashboardCard";

function Dashboard() {
  const { data: users } = useUsers();
  const teachers = users.map((user) => user.role === "teacher");
  const { data: groups } = useGroups();
  const { data: students } = useStudents();
  const { data: subjects } = useSubjects();
  const { data: terms } = useTerms();
  const { takenAttendance, pendingAttendance } = usePeriods();
  const { termRate, currentRate } = useAttendanceRate();

  return (
    <div>
      <h1>Dashboard</h1>
      <Row>
        <h6 className="mt-4 mb-2">Quick Stats</h6>
        <DashboardCard
          title="Teachers"
          count={teachers.length}
          icon={faPersonChalkboard}
          color="text-primary"
          link="/users"
        />
        <DashboardCard
          title="Students"
          count={students.length}
          icon={faGraduationCap}
          color="text-warning"
          link="/students"
        />
        <DashboardCard
          title="Groups"
          count={groups.length}
          icon={faUsersLine}
          color="text-info"
          link="/groups"
        />
        <DashboardCard
          title="Subjects"
          count={subjects.length}
          icon={faBookAtlas}
          color="text-success"
          link="/subjects"
        />
        <DashboardCard
          title="Terms"
          count={terms.length}
          icon={faCloudSun}
          color="text-danger"
          link="/terms"
        />
      </Row>
      <Row>
        <h6 className="mt-4 mb-2">Current Week Attendace</h6>
        <DashboardCard
          title="Done"
          count={takenAttendance?.length}
          icon={faCheck}
          color="text-success"
          link="submittedAttendances"
        />
        <DashboardCard
          title="Remaining"
          count={pendingAttendance?.length}
          icon={faHourglass}
          color="text-danger"
          link="remainingAttendances"
        />
      </Row>
      <Row>
        <h6 className="mt-4 mb-2">Attendace Rates</h6>
        <DashboardCard
          title="By Current"
          count={currentRate}
          icon={faChartPie}
          color="text-info"
          type="percent"
        />
        <DashboardCard
          title="By Terms"
          count={termRate}
          icon={faChartBar}
          color="text-warning"
          type="percent"
        />
      </Row>
    </div>
  );
}

export default Dashboard;
