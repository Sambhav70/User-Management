// src/Components/SortComponent.jsx
import React, { useState } from "react";
import Select from "@atlaskit/select";
import { ButtonGroup } from '@atlaskit/button';
import Button from '@atlaskit/button/new';
import "@atlaskit/css-reset";
import "@atlaskit/css-reset";

export default function SortControls({ onSortChange }) {
  const [sortKey, setSortKey] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);

  const sortKeyOptions = [
    { label: "Select field...", value: "" },
    { label: "First Name", value: "firstName" },
    { label: "Last Name", value: "lastName" },
    { label: "Age", value: "age" }
  ];

  const sortOrderOptions = [
    { label: "Select order...", value: "" },
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" }
  ];

  const handleApply = () => {
    if (!sortKey?.value || !sortOrder?.value) return;
    onSortChange({ key: sortKey.value, order: sortOrder.value });
  };

  const handleClear = () => {
    setSortKey(null);
    setSortOrder(null);
    onSortChange({ key: null, order: null });
  };

  const isApplyDisabled = !sortKey?.value || !sortOrder?.value;

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
      <Select
        inputId="sort-key-select"
        placeholder="Select field to sort"
        value={sortKey}
        onChange={setSortKey}
        options={sortKeyOptions}
        isClearable={false}
        width="200px"
      />
      
      <Select
        inputId="sort-order-select"
        placeholder="Select order"
        value={sortOrder}
        onChange={setSortOrder}
        options={sortOrderOptions}
        isClearable={false}
        width="150px"
      />
      
      <ButtonGroup label="Sort controls">
        <Button 
          appearance="primary" 
          onClick={handleApply}
          isDisabled={isApplyDisabled}
        >
          Apply Sort
        </Button>
        
        <Button 
          appearance="subtle" 
          onClick={handleClear}
        >
          Clear Sort
        </Button>
      </ButtonGroup>
    </div>
  );
}