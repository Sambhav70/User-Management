import { useEffect, useState } from "react";
import DynamicTable from "@atlaskit/dynamic-table";
import Button from "@atlaskit/button/new";
import { decryptData, encryptData } from "./cryptoUtils";

function ShortlistedUsers() {
  const [shortlisted, setShortlisted] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("shortlistedUsers");
    if (stored) {
      setShortlisted(decryptData(stored));
    }
  }, []);

  const handleRemove = (id) => {
    const updated = shortlisted.filter((u) => u.id !== id);
    setShortlisted(updated);
    if (updated.length > 0) {
      localStorage.setItem("shortlistedUsers", encryptData(updated));
    } else {
      localStorage.removeItem("shortlistedUsers");
    }
  };

  const handleClearAll = () => {
    setShortlisted([]);
    localStorage.removeItem("shortlistedUsers");
  };

  const head = {
    cells: [
      { key: "id", content: "ID" },
      { key: "name", content: "Name" },
      { key: "email", content: "Email" },
      { key: "actions", content: "Actions" },
    ],
  };

  const rows = shortlisted.map((user) => ({
    key: user.id,
    cells: [
      { key: "id", content: user.id },
      { key: "name", content: `${user.firstName} ${user.lastName}` },
      { key: "email", content: user.email },
      {
        key: "actions",
        content: (
          <Button appearance="danger" onClick={() => handleRemove(user.id)}>
            Remove
          </Button>
        ),
      },
    ],
  }));

  return (
    <div style={{ padding: "15px" }}>
      <h2>Shortlisted Users</h2>
      <Button appearance="danger" onClick={handleClearAll} style={{ marginBottom: "10px" }}>
        Clear All
      </Button>
      <DynamicTable head={head} rows={rows} rowsPerPage={5} defaultPage={1} isFixedSize />
    </div>
  );
}

export default ShortlistedUsers;
