import React, { useState, useEffect } from "react";
import ModalComponent from "@/themes/components/modal/modal";
import DropdownMenu from "@/themes/components/dropdown-menu/dropdown-menu";
import styles from "./map-user.module.scss";
import SelectUser from "../user-select/user-select";
import Icons from "@/themes/images/icons/icons";
import useRoleService, { User, UserResponse } from "@/module/admin-settings/services/role-service";
import ButtonComponent from "@/themes/components/button/button";

interface MapUserModalProps {
  isVisible: boolean;
  roleId: string;
  onUserChange?: (selectedUsers: User[]) => void;
  onSave: () => void;
  onClose: () => void;
}

const MapUserModal: React.FC<MapUserModalProps> = ({
  isVisible,
  roleId,
  onUserChange,
  onSave,
  onClose,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [mappedUsers, setMappedUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]); 
  const { fetchAllUsers, fetchMappedUsers, mapUsersToRole } = useRoleService();

  // Fetch all users and mapped users
  useEffect(() => {
    const fetchUsers = async () => {
      const response: UserResponse = await fetchAllUsers(); 
      if (response?.data) {
        setUsers(response.data);
      }
    };

    const fetchMappedUsersList = async () => {
      const response: UserResponse = await fetchMappedUsers(roleId); 
      if (response?.data) {
        setMappedUsers(response.data);
      }
    };

    if (isVisible) {
      fetchUsers();
      fetchMappedUsersList();
    }
  }, [isVisible, roleId]);

  // Handle user selection change
  const handleUserChange = (updatedUsers: User[]) => {
    const selectedIds = updatedUsers.filter((user) => user.checked).map((user) => user.id);
    setSelectedUserIds(selectedIds);
    onUserChange && onUserChange(updatedUsers);
  };

  // Handle save button click
  const handleSave = async () => {
    const payload = {
      roleId: roleId,
      userIds: selectedUserIds,
    };

    const response = await mapUsersToRole(payload.roleId, payload.userIds);

    if (response.status) {
      onSave(); 
    } else {
      alert(response.message); 
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    onClose();
  };

  return (
    <ModalComponent
      isVisible={isVisible}
      title={`Map User to Role`}
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
                        mappedUsers={mappedUsers}
                        onUserChange={handleUserChange}
                      />
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      }
      bottomContent={
        <>
          <ButtonComponent label="Cancel" theme="white" onClick={handleCancel} />
          <ButtonComponent label="Save" theme="black" onClick={handleSave} />
        </>
      }
      onClose={onClose}
    />
  );
};

export default MapUserModal;
