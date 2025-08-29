// src/ShortlistedUsersModal.jsx
import React from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import { Button, Modal } from "react-bootstrap";
import "@atlaskit/css-reset";
import 'bootstrap/dist/css/bootstrap.min.css';

const ShortlistedUsers = ({ show, handleClose, shortlisted, onRemove }) => {
  const head = {
    cells: [
    //   { key: "id", content: "ID" },
      { key: "firstName", content: "First Name" },
      { key: "lastName", content: "Last Name" },
      { key: "actions", content: "Actions" },
    ],
  };

  const rows = shortlisted.map((user) => ({
    key: user.id,
    cells: [
    //   { key: "id", content: user.id },
      { key: "firstName", content: user.firstName },
      { key: "lastName", content: user.lastName },
      {
        key: "actions",
        content: (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onRemove(user.id)}
          >
            Remove
          </Button>
        ),
      },
    ],
  }));

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Shortlisted Users</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {shortlisted.length > 0 ? (
          <DynamicTable
            head={head}
            rows={rows}
            rowsPerPage={5}
            defaultPage={1}
            loadingSpinnerSize="large"
            isFixedSize
          />
        ) : (
          <p>No shortlisted users yet.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShortlistedUsers;
