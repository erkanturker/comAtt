import React, { useState } from "react";
import GenericTable from "./CommonJsx/GenericTable";
import GenericForm from "./CommonJsx/GenericForm";
import { Container, Spinner } from "react-bootstrap";
import useGroups from "../hooks/useGroups";
import CustomAlert from "./CommonJsx/CustomAlert";

const GroupManagement = () => {
  const {
    data: groups,
    addItem: addGroup,
    removeItem: removeGroup,
    loading,
    alert,
    closeAlert,
  } = useGroups();
  
  const groupFields = [
    {
      name: "groupName",
      label: "Group Name",
      type: "text",
      placeholder: "Enter group name",
      required: true,
    },
  ];

  const groupColumns = [{ label: "Group Name", accessor: "groupName" }];
  return (
    <div>
      <h1 className="mb-4">Groups</h1>
      <Container fluid>
        {loading && <Spinner />}
        {alert.visible && (
          <CustomAlert
            type={alert.type}
            title={alert.title}
            messages={alert.messages}
            visible={alert.visible}
            onClose={closeAlert}
          />
        )}
        <GenericForm
          title="Create Group"
          initialData={{ groupName: "" }}
          onSubmit={addGroup}
          fields={groupFields}
          submitButtonText="Create Group"
        />

        <GenericTable
          title="All Groups"
          columns={groupColumns}
          data={groups}
          onDelete={(group) => {
            removeGroup(group.groupId);
          }}
        />
      </Container>
    </div>
  );
};

export default GroupManagement;
