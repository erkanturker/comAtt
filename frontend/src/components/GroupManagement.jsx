import React from "react";
import { Container, Spinner } from "react-bootstrap";
import useGroups from "../hooks/useGroups";
import CustomAlert from "./CommonJsx/CustomAlert";
import GenericForm from "./CommonJsx/GenericForm";
import GenericTable from "./CommonJsx/GenericTable";

/**
 * GroupManagement Component
 *
 * This component provides an interface for managing groups.
 * It allows the creation and deletion of groups, and displays
 * a list of all groups in a table format.
 *
 * State:
 * - initialData: Initial state for the form data.
 * - groupFields: Defines the fields used in the GenericForm for group creation.
 * - groupColumns: Defines the columns used in the GenericTable for displaying group data.
 */

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
