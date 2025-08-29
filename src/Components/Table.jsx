// src/Components/Table.jsx
import React, { useState, useMemo } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import SortControls from "./SortControls";
import Button from '@atlaskit/button/new';
export default function Table({ users, handleDetails })
 {
  const [sortConfig, setSortConfig] = useState({ key: null, order: null });

  const sortedUsers = useMemo(() => {
    if (!users || users.length === 0) return [];
    const { key, order } = sortConfig;
    if (!key || !order) return users;

    const copy = [...users];
    copy.sort((a, b) => {
      let va = a[key];
      let vb = b[key];

      if (va === undefined || va === null) va = "";
      if (vb === undefined || vb === null) vb = "";

      if (typeof va === "number" || typeof vb === "number") {
        const na = Number(va) || 0;
        const nb = Number(vb) || 0;
        return order === "ASC" ? na - nb : nb - na;
      }

      const sa = String(va).toLowerCase();
      const sb = String(vb).toLowerCase();
      if (sa < sb) return order === "ASC" ? -1 : 1;
      if (sa > sb) return order === "ASC" ? 1 : -1;
      return 0;
    });

    return copy;
  }, [users, sortConfig]);

  if (!users) return <p>Loading users...</p>;
  if (users.length === 0) return <p>No users to display</p>;

  const head = {
    cells: [
    //   { key: "id", content: "ID" },
      { key: "firstName", content: "First name" },
      { key: "lastName", content: "Last name" },
      { key: "age", content: "Age" },
      { key: "company", content: "Company" },
      { key: "bloodGroup", content: "Blood group" },
      { key: "email", content: "Email" },
      { key: "details", content: "Details" },
    ],
  };

  const rows = sortedUsers.map((u) => ({
    key: String(u.id),
    cells: [
    //   { key: "id", content: u.id },
      { key: "firstName", content: u.firstName },
      { key: "lastName", content: u.lastName },
      { key: "age", content: u.age },
      { key: "company", content: u.company?.name ?? "-" },
      { key: "bloodGroup", content: u.bloodGroup ?? "-" },
      { key: "email", content: u.email },
        {
        key: "details",
        content: (
            <Button
            onClick={() => handleDetails(u)}
            >
            Details
            </Button>
        ),
        }
    ],
  }));

  return (
    <div>
    <div style={{marginBottom:"20px"}}>
    <label htmlFor="sort-users" style={{ fontSize: "12px", fontWeight: "600" }}>
        Sort Users
    </label>
      <SortControls
        onSortChange={(cfg) => setSortConfig(cfg)}
        onClearSort={() => setSortConfig({ key: null, order: null })}
      />
    </div>
      <DynamicTable
        head={head}
        rows={rows}
        rowsPerPage={15}
        defaultPage={1}
      />
    </div>
  );
}
