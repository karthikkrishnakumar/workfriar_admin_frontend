"use client";

import React, { useState } from "react";
import ModalComponent from "@/themes/components/modal/modal";
import DropdownMenu from "@/themes/components/dropdown-menu/dropdown-menu";
import styles from "./map-user.module.scss";
import SelectUser from "../user-select/user-select";
import Icons from "@/themes/images/icons/icons";

interface User {
  id: string;
  name: string;
  checked: boolean;
}

interface MapUserModalProps {
  isVisible: boolean;
  role: string;
  onUserChange: (selectedUsers: User[]) => void;
  onSave: () => void;
  onClose: () => void;
}

const MapUserModal: React.FC<MapUserModalProps> = ({
  isVisible,
  role,
  onUserChange,
  onSave,
  onClose,
}) => {
  const [users, setUsers] = useState<User[]>([
    { id: "1", name: "John Doe", checked: false },
    { id: "2", name: "Jane Smith", checked: false },
    { id: "3", name: "Bob Johnson", checked: false },
    { id: "4", name: "Bob Johnson", checked: false },
    { id: "5", name: "Bob Johnson", checked: false },
    { id: "6", name: "Bob Johnson", checked: false },
    { id: "7", name: "Bob Johnson", checked: false },
    { id: "8", name: "Bob Johnson", checked: false },
    { id: "9", name: "Bob Johnson", checked: false },
  ]);

  const handleSave = () => {
    const selectedUsers = users.filter((user) => user.checked);
    onUserChange(selectedUsers);
    onSave();
  };
//
  return (
    <ModalComponent
      isVisible={isVisible}
      title={`Map User to "${role}"`}
      theme="normal"
      content={
        <div className={styles.modalContent}>
          <div className={styles.field}>
            <label>
              User<span className={styles.asterisk}>*</span>
            </label>

            <DropdownMenu
              trigger={["click"]}
              wrapperClassName={styles.dropdownTriggerWrapper} 
              icon={
                <div className={styles.triggerContainer}>
                  <span>Select user</span>
                  <div className={styles.dropdownIcon}>
                    {Icons.arrowDownOutline}
                  </div>
                </div>
              }
              dropdownClassName={styles.dropdownMenuOverlay}
              menuItems={[
                {
                  key: "dropdown-content",
                  label: (
                    <div
                      onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    >
                      <SelectUser
                        users={users}
                        onUserChange={(updatedUsers) => setUsers(updatedUsers)}
                      />
                    </div>
                  ),
                },
              ]}
            />

          </div>
        </div>
      }
      primaryButtonLabel="Cancel"
      secondaryButtonLabel="Save"
      onPrimaryClick={onClose}
      onSecondaryClick={handleSave}
      onClose={onClose}
    />
  );
};

export default MapUserModal;
