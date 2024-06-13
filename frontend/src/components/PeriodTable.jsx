import React from "react";
import { Row, Table, Col } from "react-bootstrap";
import moment from "moment";

/**
 * PeriodTable Component
 *
 * This component renders a table displaying the schedule for different groups on various dates.
 * It groups periods by date and displays the periods for each group in a table format.
 *
 * Props:
 * - groups: An array of group objects containing group information.
 * - periods: An array of period objects containing period information.
 * - subjects: An array of subject objects containing subject information.
 *
 * Returns:
 * - A div containing a table for each date with the group's schedule.
 */

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
