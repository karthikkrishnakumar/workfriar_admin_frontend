import React, { useState, useEffect, useCallback, useMemo } from "react";
import { message } from "antd";
import Table, { ColumnType } from "@/themes/components/table/table";
import DropdownMenu from "@/themes/components/dropdown-menu/dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import useRoleService, { Role } from "../../services/role-service";
import { useRouter } from "next/navigation";
import EditRoleModal from "../role-modal/edit-role-modal/edit-role-modal";
import MapUserModal from "../map-user/map-user-modal/map-user-modal";
import { departmentOptions, statusOptions } from "../../constants";
import styles from "./role-listing.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import AddRoleModal from "../role-modal/add-role-modal/add-role-modal";
import DeleteRoleModal from "../role-modal/delete-role-modal/delete-role-modal";
import { closeModal } from "@/redux/slices/modalSlice";

const RoleListingTable: React.FC = () => {
  const { listRoles, updateRole } = useRoleService();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<"add" | "edit" | "map-user" | "delete" | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);
  
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    const response = await listRoles();
    if (response.status) {
      const rolesWithKeys = (response.roles || []).map(role => ({
        ...role,
        key: role.roleId?.toString() // Ensure key is a string
      }));
      setRoles(rolesWithKeys);
    } else {
      message.error(response.message || "Failed to fetch roles.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  const handleStatusChange = async (role: Role, newStatus: boolean) => {
    const updatedRole = { ...role, status: newStatus };
    const response = await updateRole(updatedRole);

    if (response.status) {
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.roleId === role.roleId ? { ...r, status: newStatus } : r))
      );
      message.success("Role status updated successfully!");
    } else {
      message.error(response.message || "Failed to update role status.");
    }
  };

  const handleMenuClick = (action: string, role: Role) => {
    setSelectedRole(role);
    switch (action) {
      case "edit":
        setActiveModal("edit");
        break;
      case "update-permissions":
        router.push(`/settings/permissions/${role?.roleId}`);
        break;
      case "map-user":
        setActiveModal("map-user");
        break;
      case "delete":
        setActiveModal("delete");
        break;
      default:
        break;
    }
  };

  const columns: ColumnType[] = useMemo(
    () => [
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: "30%",
      },
      {
        title: "Department",
        dataIndex: "department",
        key: "department",
        width: "22%",
      },
      {
        title: "No. of Users",
        dataIndex: "users",
        key: "users",
        width: "22%",
        render: (_, record: Role) => (
          <span>
            {record.no_of_users === 1 ? "1 employee" : `${record.no_of_users} employees`}
          </span>
        ),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "22%",
        render: (_, record: Role) => (
          <DropdownMenu
            menuItems={[
              {
                key: `status-active-${record.roleId}`,
                label: "Active",
                onClick: () => handleStatusChange(record, true),
              },
              {
                key: `status-inactive-${record.roleId}`,
                label: "Inactive",
                onClick: () => handleStatusChange(record, false),
              },
            ]}
            icon={
              <div className={styles.status}>
                <span className={styles.statusText}>
                  {record.status ? "Active" : "Inactive"}
                </span>
                {Icons.arrowDownFilledGold}
              </div>
            }
            wrapperClassName={styles.statusTriggerWrapper}
            dropdownClassName={styles.statusDropdownMenuOverlay}
          />
        ),
      },
      {
        key: "actions",
        width: "4%",
        render: (_, record: Role) => (
          <DropdownMenu
            menuItems={[
              { 
                key: `action-edit-${record.roleId}`, 
                label: "Edit", 
                onClick: () => handleMenuClick("edit", record) 
              },
              {
                key: `action-permissions-${record.roleId}`,
                label: "Update Role Permissions",
                onClick: () => handleMenuClick("update-permissions", record),
              },
              { 
                key: `action-map-${record.roleId}`, 
                label: "Map User", 
                onClick: () => handleMenuClick("map-user", record) 
              },
              { 
                key: `action-delete-${record.roleId}`, 
                label: "Delete", 
                onClick: () => handleMenuClick("delete", record) 
              },
            ]}
            icon={Icons.threeDots}
            wrapperClassName={styles.actionTriggerWrapper}
            dropdownClassName={styles.actionDropdownMenuOverlay}
          />
        ),
      },
    ],
    []
  );

  return (
    <>
      <Table 
          columns={columns} 
          dataSource={roles} 
          rowKey={(record) => record.roleId.toString()}
          loading={loading} 
          skeletonRows={5}
          maxHeight = {560}
        />
      {isOpen && modalType === "roleModal" && (
        <AddRoleModal
          isVisible
          departmentOptions={departmentOptions}
          statusOptions={statusOptions}
          onClose={() => {
            setActiveModal(null);
            dispatch(closeModal());
          }}
          onRoleAdded={fetchRoles}
        />
      )}

      {activeModal === "edit" && selectedRole && (
        <EditRoleModal
          isVisible
          roleData={selectedRole}
          departmentOptions={departmentOptions}
          statusOptions={statusOptions}
          onClose={() => setActiveModal(null)}
          onRoleUpdated={fetchRoles}
        />
      )}

      {activeModal === "map-user" && selectedRole?.roleId && (
        <MapUserModal
          isVisible
          roleId={selectedRole.roleId}
          onSave={() => setActiveModal(null)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "delete" && selectedRole?.roleId && (
        <DeleteRoleModal
          isVisible
          roleData={selectedRole}
          onClose={() => setActiveModal(null)}
          onRoleDeleted={fetchRoles}
        />
      )}
    </>
  );
};

export default RoleListingTable;