import React, { useState } from "react";
import SearchBar from "@/themes/components/search-bar/search-bar";
import CheckboxComponent from "@/themes/components/checkbox/checkbox";
import styles from "./user-select.module.scss";
import { User } from "@/module/admin-settings/services/role-service";

interface SelectUserProps {
  users: User[];
  mappedUsers: User[];  
  onUserChange: (updatedUsers: User[]) => void;
}

const SelectUser: React.FC<SelectUserProps> = ({ users, mappedUsers, onUserChange }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mark users as checked if they are in mappedUsers
  const updatedUsers = users.map((user) => ({
    ...user,
    checked: mappedUsers.some((mappedUser) => mappedUser.id === user.id),
  }));

  // Handle checkbox change
  const handleCheckboxChange = (id: string) => {
    const updatedUsersState = updatedUsers.map((user) =>
      user.id === id ? { ...user, checked: !user.checked } : user
    );
    onUserChange(updatedUsersState); 
  };

  // Filter users based on the search term
  const filteredUsers = updatedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort users: First mapped users, then the rest
  const sortedUsers = [
    ...filteredUsers.filter((user) => user.checked),
    ...filteredUsers.filter((user) => !user.checked),
  ];

  return (
    <div className={styles.userSelectdropdownContent}>
      <SearchBar
        placeholder="Search"
        onChange={setSearchTerm}
        value={searchTerm}
      />
      <div className={styles.userList}>
        {sortedUsers.map((user) => (
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
