import React, { useState } from "react";
import SearchBar from "@/themes/components/search-bar/search-bar";
import CheckboxComponent from "@/themes/components/checkbox/checkbox";
import styles from "./user-select.module.scss";

interface User {
  id: string;
  name: string;
  checked: boolean;
}

interface SelectUserProps {
  users: User[];
  onUserChange: (updatedUsers: User[]) => void;
}

const SelectUser: React.FC<SelectUserProps> = ({ users, onUserChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleCheckboxChange = (id: string) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, checked: !user.checked } : user
    );
    onUserChange(updatedUsers);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.userSelectdropdownContent}>
      <SearchBar
        placeholder="Search"
        onChange={setSearchTerm}
        value={searchTerm}
      />
      <div className={styles.userList}>
        {filteredUsers.map((user) => (
          <div key={user.id} className={styles.userItem}>
            <CheckboxComponent
              checked={user.checked}
              onChange={() => handleCheckboxChange(user.id)}
            />
            <span>{user.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectUser;
