import { useEffect, useState } from "react";
import axios from "axios";
import Table from "./Components/Table";
import Search from "./Components/Search";
import Filter from "./Components/Filter";
import EmployeeDetailsModal from "./Components/EmployeeDetailsModal";
import 'bootstrap/dist/css/bootstrap.min.css';
import ShortlistedUsers from "./Components/ShortlistedUsers";
import Button from "@atlaskit/button/new";

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    gender: "",
    bloodGroup: "",
    university: "",
  });

  const [options, setOptions] = useState({
    genders: [],
    bloodGroups: [],
    universities: [],
  });

  // modal + shortlist states
  const [selectedUser, setSelectedUser] = useState(null);
  const [shortlisted, setShortlisted] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const baseUrl = "https://dummyjson.com";

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        let allUsers = [];
        let skip = 0;
        const limit = 100;
        let total = 0;

        do {
          const response = await axios.get(
            `${baseUrl}/users?limit=${limit}&skip=${skip}`
          );
          allUsers = [...allUsers, ...response.data.users];
          total = response.data.total;
          skip += limit;
        } while (allUsers.length < total);

        setUsers(allUsers);
        setFilteredUsers(allUsers);

        const genders = [...new Set(allUsers.map((u) => u.gender))];
        const bloodGroups = [...new Set(allUsers.map((u) => u.bloodGroup))];
        const universities = [...new Set(allUsers.map((u) => u.university))];

        setOptions({ genders, bloodGroups, universities });
      } catch (e) {
        console.error(e.message);
      }
    };
    getAllUsers();
  }, []);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`${baseUrl}/users/search?q=${query}`);
      setFilteredUsers(response.data.users);
    } catch (e) {
      console.error(e.message);
    }
  };

  const handleClearSearch = () => {
    setFilteredUsers(users);
  };

  useEffect(() => {
    let tempUsers = [...users];
    if (filters.gender) {
      tempUsers = tempUsers.filter((u) => u.gender === filters.gender);
    }
    if (filters.bloodGroup) {
      tempUsers = tempUsers.filter((u) => u.bloodGroup === filters.bloodGroup);
    }
    if (filters.university) {
      tempUsers = tempUsers.filter((u) => u.university === filters.university);
    }
    setFilteredUsers(tempUsers);
  }, [filters, users]);

  //Open modal with user details
  const handleDetails = (user) => {
    console.log("Details clicked for user:", user);
    setSelectedUser(user);
  };


  //Shortlist candidate
  const handleShortlist = (user) => {
    setShortlisted((prev) => {
      if (prev.find((u) => u.id === user.id)) return prev; // avoid duplicates
      return [...prev, user];
    });
  };


  return (
    <>
    <div style={{padding:"15px"}}>
    <div>
      <h1><center>User Management App</center></h1>
    <div>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        View Shortlisted Users
      </Button>
      <ShortlistedUsers
        show={showModal}
        handleClose={() => setShowModal(false)}
        shortlisted={shortlisted}
        onRemove={(id) =>
          setShortlisted((prev) => prev.filter((u) => u.id !== id))
        }
      />
    </div>
      <div style={{marginTop:"10px",marginBottom:"10px"}}>
      <Search onSearch={handleSearch} onClear={handleClearSearch} />
      <Filter options={options} setFilters={setFilters} />
      </div>
      <Table users={filteredUsers} handleDetails={handleDetails} />
      </div>
    <div>
    <EmployeeDetailsModal
      show={!!selectedUser}
      user={selectedUser}
      onHide={() => setSelectedUser(null)}
      onShortlist={handleShortlist}
    />
    </div>
    </div>
    </>
  );
}

export default App;
