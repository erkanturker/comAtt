import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

import moment from "moment";
import ReactSelect from "react-select";
import useAttendanceRate from "../hooks/useAttendanceRate";
import useGroups from "../hooks/useGroups";
import useStudents from "../hooks/useStudents";
import GenericTable from "./CommonJsx/GenericTable";
import transformData from "../helper/transformData";

const ReportAdmin = () => {
  const { data: groups } = useGroups();
  const { data: students } = useStudents();
  const { termAttendances } = useAttendanceRate();
  const [filteredstudents, setFilteredstudents] = useState([]);
  const [studentAttendancesReport, setStudentAttendancesReport] = useState([]);

  const initialFormInfo = {
    groupName: "",
    studentFullName: "",
    termName: "",
  };
  const [formInfo, setFormInfo] = useState(initialFormInfo);

  const groupOptions = groups.map((group) => ({
    value: group.groupId,
    label: group.groupName,
  }));

  const handleGroupSelect = (groupId, groupName) => {
    setFormInfo(initialFormInfo);
    setStudentAttendancesReport([]);
    setFilteredstudents(
      students.filter((student) => student.groupId === groupId)
    );
    setFormInfo((prevData) => ({ ...prevData, groupName }));
  };

  const optionsStudent = filteredstudents.map(
    ({ studentId, firstName, lastName }) => ({
      value: studentId,
      label: `${firstName} ${lastName}`,
    })
  );

  const handleStudentSelect = (studentId, studentFullName) => {
    const filteredAttendance = termAttendances
      .filter((att) => att.studentId === studentId)
      .map((att) => ({ ...att, date: moment(att.date).format("MM-DD-YYYY") }));

    const termName = filteredAttendance[0].termName;

    const tableData = {};
    for (const { date, periodNumber, status } of filteredAttendance) {
      if (!tableData[date]) {
        tableData[date] = [{ studentId, periodNumber, status }];
      } else {
        tableData[date].push({ studentId, periodNumber, status });
      }
    }
    setStudentAttendancesReport(transformData(tableData));
    setFormInfo((prevData) => ({ ...prevData, studentFullName, termName }));
  };

  return (
    <div>
      <h1 className="mb-4">Report</h1>
      <Container fluid>
        <Form>
          <Row style={{ background: "white" }} className="pt-3 m-1">
            <h6 className="mb-4">Get Student Atttendace Report By Term</h6>
            <Col md={3}>
              <Form.Group controlId="schedule" className="mb-3 px-4">
                <Form.Label>Select a Group</Form.Label>
                <ReactSelect
                  options={groupOptions}
                  onChange={({ value, label }) =>
                    handleGroupSelect(value, label)
                  }
                ></ReactSelect>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group controlId="schedule" className="mb-3 px-4">
                <Form.Label>Select a Student</Form.Label>
                <ReactSelect
                  value={
                    optionsStudent.find(
                      (student) => student.label === formInfo.studentFullName
                    ) || null
                  }
                  options={optionsStudent}
                  onChange={({ value, label }) =>
                    handleStudentSelect(value, label)
                  }
                ></ReactSelect>
              </Form.Group>
            </Col>
          </Row>
        </Form>
        {studentAttendancesReport.columns && (
          <GenericTable
            title={[
              `Term: ${formInfo.termName}`,
              `Group: ${formInfo.groupName}`,
              `Name: ${formInfo.studentFullName}`,
            ]}
            columns={studentAttendancesReport?.columns}
            data={studentAttendancesReport?.transformedData}
            showDeleteButton={false}
          />
        )}
      </Container>
    </div>
  );
};

export default ReportAdmin;
