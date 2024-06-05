// src/components/PeriodTable.jsx
import React from "react";
import { Row, Table, Col } from "react-bootstrap";
import moment from "moment";

const PeriodTable = ({ groups, periods, subjects }) => {
  
    const getSubjectName = (subjectId) => {
    const subject = subjects.find((subject) => subject.subjectId === subjectId);
    return subject ? subject.subjectName : "No Class";
  };

  const renderTable = () => {
    const groupedPeriods = periods.reduce((acc, period) => {
      const date = moment(period.date).format("YYYY-MM-DD");
      if (!acc[date]) acc[date] = [];
      acc[date].push(period);
      return acc;
    }, {});

    return Object.keys(groupedPeriods).map((date) => (
      <Row key={date} style={{ background: "white" }} className="pt-4 m-1 mt-2">
        <Col md={12}>
          <h6>Schedule for {moment(date).format("MM/DD/YYYY")}</h6>
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Period 1</th>
                <th>Period 2</th>
                <th>Period 3</th>
                <th>Period 4</th>
              </tr>
            </thead>
            <tbody>
              {groups.map((group) => (
                <tr key={group.groupId}>
                  <td>{group.groupName}</td>
                  {[1, 2, 3, 4].map((periodNumber) => {
                    const period = groupedPeriods[date].find(
                      (p) =>
                        p.groupId === group.groupId &&
                        p.periodNumber === periodNumber
                    );
                    return (
                      <td key={periodNumber}>
                        {period ? getSubjectName(period.subjectId) : "No Class"}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    ));
  };

  return <div>{renderTable()}</div>;
};

export default PeriodTable;
