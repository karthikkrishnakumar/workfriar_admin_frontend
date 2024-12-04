import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Skeleton, message } from "antd";
import Table, { ColumnType } from "@/themes/components/table/table";
import DropdownMenu from "@/themes/components/dropdown-menu/dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import styles from "./role-listing.module.scss";
import useRoleService, { Role } from "../../services/role-service";
import { useRouter } from "next/navigation";
import EditRoleModal from "../role-modal/edit-role-modal/edit-role-modal";
import MapUserModal from "../map-user/map-user-modal/map-user-modal";

const SettingsRoleTable: React.FC = () => {
  const { listRoles, updateRole } = useRoleService();
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<"edit" | "map-user" | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const router = useRouter();

  // Use useCallback to memoize the fetch function
  const fetchRoles = useCallback(async () => {
    const response = await listRoles();
    if (response.status) {
      setRoles(response.roles || []);
    } else {
      message.error(response.message);
    }
    setLoading(false);
  }, []);

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle status update
  const handleStatusChange = async (role: Role, newStatus: boolean) => {
    const response = await updateRole(role.id, newStatus);
    if (response.status) {
      setRoles((prevRoles) =>
        prevRoles.map((r) => (r.id === role.id ? { ...r, status: newStatus } : r))
      );
      message.success(response.message);
    } else {
      message.error(response.message);
    }
  };

  // Handle dropdown actions
  const handleMenuClick = (action: string, role: Role) => {
    setSelectedRole(role);

    switch (action) {
      case "edit":
        setActiveModal("edit");
        break;
      case "map-user":
        setActiveModal("map-user");
        break;
      case "update-permissions":
        router.push("/home/settings/permissions");
        break;
      case "delete":
        setRoles((prevRoles) => prevRoles.filter(({ id }) => id !== role.id));
        break;
    }
  };

  const columns: ColumnType[] = useMemo(() => [
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
      render: (_, record) => (
        <span>
          {record.users === 1 ? "1 employee" : `${record.users} employees`}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "22%",
      render: (_, record) => (
        <DropdownMenu
          menuItems={[
            {
              key: "active",
              label: "Active",
              onClick: () => handleStatusChange(record, true), // active
            },
            {
              key: "inactive",
              label: "Inactive",
              onClick: () => handleStatusChange(record, false), // inactive
            },
          ]}
          icon={
            <div className={styles.status}>
              <span className={styles.statusText}>
                {record.status ? "Active" : "Inactive"} {/* Display Active/Inactive based on status */}
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
      render: (_, record) => (
        <DropdownMenu
          menuItems={[
            { key: "edit", label: "Edit", onClick: () => handleMenuClick("edit", record) },
            { key: "update-permissions", label: "Update Role Permissions", onClick: () => handleMenuClick("update-permissions", record) },
            { key: "map-user", label: "Map User", onClick: () => handleMenuClick("map-user", record) },
            { key: "delete", label: "Delete", onClick: () => handleMenuClick("delete", record) },
          ]}
          icon={Icons.threeDots}
          wrapperClassName={styles.actionTriggerWrapper}
          dropdownClassName={styles.actionDropdownMenuOverlay}
        />
      ),
    },
  ], [roles]);

  console.log(roles)

  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <Table columns={columns} dataSource={roles} />
      )}

      {activeModal === "edit" && selectedRole && (
        <EditRoleModal
          isVisible
          role={selectedRole.role}
          department={selectedRole.department}
          status={selectedRole.status}
          onRoleChange={(role) => setSelectedRole((prev) => prev && { ...prev, role })}
          onDepartmentChange={(department) => setSelectedRole((prev) => prev && { ...prev, department })}
          onStatusChange={(status) => setSelectedRole((prev) => prev && { ...prev, status })}
          onSave={() => {
            if (selectedRole) updateRole(selectedRole.id, selectedRole);
            setActiveModal(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "map-user" && selectedRole && (
        <MapUserModal
          isVisible
          role={selectedRole.role}
          onUserChange={(users) => setSelectedRole((prev) => prev && { ...prev, users })}
          onSave={() => setActiveModal(null)}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

export default SettingsRoleTable;
