import { useState } from "react";
import Select from "@atlaskit/select";
import{ ButtonGroup } from '@atlaskit/button';
import Button from '@atlaskit/button/new';

import "@atlaskit/css-reset";

function Filter({ options, setFilters }) {
  const [localFilters, setLocalFilters] = useState({
    gender: null,
    bloodGroup: null,
    university: null
  });

  const handleChange = (name, selectedOption) => {
    setLocalFilters(prev => ({ 
      ...prev, 
      [name]: selectedOption 
    }));
  };

  const applyFilters = () => {
    const filtersToSend = {
      gender: localFilters.gender?.value || "",
      bloodGroup: localFilters.bloodGroup?.value || "",
      university: localFilters.university?.value || ""
    };
    setFilters(filtersToSend);
  };

  const clearFilters = () => {
    setLocalFilters({ gender: null, bloodGroup: null, university: null });
    setFilters({ gender: "", bloodGroup: "", university: "" });
  };

  const genderOptions = [
    { label: "All Genders", value: "" },
    ...options.genders.map(g => ({ label: g, value: g }))
  ];

  const bloodGroupOptions = [
    { label: "All Blood Groups", value: "" },
    ...options.bloodGroups.map(b => ({ label: b, value: b }))
  ];

  const universityOptions = [
    { label: "All Universities", value: "" },
    ...options.universities.map(u => ({ label: u, value: u }))
  ];

  return (
    <div style={{ 
      marginBottom: "1rem", 
      display: "flex", 
      gap: "12px", 
      alignItems: "end", 
      flexWrap: "wrap" 
    }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="gender-filter" style={{ fontSize: "12px", fontWeight: "600" }}>
          Gender
        </label>
        <Select
          inputId="gender-filter"
          placeholder="Select gender"
          value={localFilters.gender}
          onChange={(option) => handleChange("gender", option)}
          options={genderOptions}
          isClearable={false}
          width="150px"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="blood-group-filter" style={{ fontSize: "12px", fontWeight: "600" }}>
          Blood Group
        </label>
        <Select
          inputId="blood-group-filter"
          placeholder="Select blood group"
          value={localFilters.bloodGroup}
          onChange={(option) => handleChange("bloodGroup", option)}
          options={bloodGroupOptions}
          isClearable={false}
          width="150px"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="university-filter" style={{ fontSize: "12px", fontWeight: "600" }}>
          University
        </label>
        <Select
          inputId="university-filter"
          placeholder="Select university"
          value={localFilters.university}
          onChange={(option) => handleChange("university", option)}
          options={universityOptions}
          isClearable={false}
          width="200px"
        />
      </div>

      <ButtonGroup label="Filter controls">
        <Button 
          appearance="primary" 
          onClick={applyFilters}
          isDisabled={!localFilters.gender && !localFilters.bloodGroup && !localFilters.university}
        >
          Apply Filters
        </Button>
        
        <Button 
          appearance="subtle" 
          onClick={clearFilters}
        >
          Clear
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default Filter;