import { useState } from "react";
import TextField from "@atlaskit/textfield";
import { ButtonGroup } from '@atlaskit/button';
import Button from '@atlaskit/button/new';
import "@atlaskit/css-reset";

function Search({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleClear = () => {
    setQuery("");      
    onClear();         
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "5px", alignItems: "center", flexWrap: "wrap" }}>
    <label htmlFor="search-employee" style={{ fontSize: "12px", fontWeight: "600" }}>
          Search Employee
    </label>
      <TextField
        name="search"
        placeholder="Search employees..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        width="300px"
      />
      
      <ButtonGroup label="Search controls">
        <Button 
          appearance="primary" 
          type="submit"
          isDisabled={!query.trim()}
        >
          Search
        </Button>
        
        <Button 
          appearance="subtle" 
          type="button" 
          onClick={handleClear}
        >
          Clear
        </Button>
      </ButtonGroup>
    </form>
  );
}

export default Search;