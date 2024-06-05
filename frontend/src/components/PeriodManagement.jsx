import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import useGroups from "../hooks/useGroups";
import usePeriods from "../hooks/usePeriods";
import useSubject from "../hooks/useSubject";
import useTerms from "../hooks/useTerms";
import GenericForm from "./CommonJsx/GenericForm";
import PeriodTable from "./PeriodTable";

const PeriodManagement = () => {
  const { data: groups } = useGroups();
  const { data: terms } = useTerms();
  const { data: subjects } = useSubject();
  const { data: periods } = usePeriods();
  const [selectedTerm, setSelectedTerm] = useState(null);

  const periodFields = [
    {
      name: "termId",
      label: "Term",
      type: "select",
      placeholder: "Select Term",
      required: true,
      options: terms.map((term) => ({
        value: term.termId,
        label: term.termName,
      })),
    },
    {
      name: "date",
      label: "Date",
      type: "date",
      required: true,
    },
    {
      name: "groupId",
      label: "Group Name",
      type: "select",
      placeholder: "Select Group",
      required: true,
      options: groups.map((group) => ({
        value: group.groupId,
        label: group.groupName,
      })),
    },
    {
      name: "subjectId",
      label: "Subject",
      type: "select",
      placeholder: "Select Subject",
      required: true,
      options: subjects.map((subject) => ({
        value: subject.subjectId,
        label: subject.subjectName,
      })),
    },
    {
      name: "periodNumber",
      label: "Period",
      type: "select",
      placeholder: "Select Period",
      required: true,
      options: [
        { value: 1, label: 1 },
        { value: 2, label: 2 },
        { value: 3, label: 3 },
        { value: 4, label: 4 },
      ],
    },
  ];

  const handleTermChange = (e) => {
    setSelectedTerm(e.target.value);
  };

  const filteredPeriods = selectedTerm
    ? periods.filter((period) => period.termId === parseInt(selectedTerm))
    : periods;

  return (
    <Container>
      <h2>Create Schedule</h2>
      <GenericForm
        title="Create Schedule"
        fields={periodFields}
        initialData={{}}
      />
      <h5 className="mt-4">Filter by Term</h5>
      <Form.Group controlId="filterByTerm">
        <Form.Label>Term</Form.Label>
        <Form.Control
          as="select"
          value={selectedTerm}
          onChange={handleTermChange}
        >
          <option value="">All Terms</option>
          {terms.map((term) => (
            <option key={term.termId} value={term.termId}>
              {term.termName}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
      <h5 className="mt-4">Scheduled Periods</h5>
      <PeriodTable
        groups={groups}
        periods={filteredPeriods}
        subjects={subjects}
      />
    </Container>
  );
};

export default PeriodManagement;