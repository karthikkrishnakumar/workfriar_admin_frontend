import React, { useState, useEffect } from "react";
import SearchBar from "@/themes/components/search-bar/search-bar";
import CheckboxComponent from "@/themes/components/checkbox/checkbox";
import styles from "./user-select.module.scss";
import { User } from "@/module/admin-settings/services/role-service";
import { UserCheckbox } from "../map-user-modal/map-user-modal";

interface SelectUserProps {
  users: User[];
  mappedUsers: User[]; 
  onUserChange: (updatedUsers: UserCheckbox[]) => void;
}

const SelectUser: React.FC<SelectUserProps> = ({
  users,
  mappedUsers,
  onUserChange,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [userList, setUserList] = useState<UserCheckbox[]>([]);

  // Adding a checked state to all users. Initialize user list with `checked` state.
  useEffect(() => {
    const updatedUsers = users.map((user) => ({
      ...user,
      checked: !!mappedUsers.find((mappedUser) => mappedUser.id === user.id),
    }));
    setUserList(updatedUsers);
  }, [users, mappedUsers]);

  // Handle checkbox state change
  const handleCheckboxChange = (id: string) => {
    const updatedUsers = userList.map((user) =>
      user.id === id ? { ...user, checked: !user.checked } : user
    );
    setUserList(updatedUsers);
    onUserChange(updatedUsers); // Pass the updated state back to the parent
  };

  // Filter users based on search term
  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  // Sort users: checked users first
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
