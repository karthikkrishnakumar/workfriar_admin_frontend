import React, { useState } from "react";
import Table, { ColumnType } from "@/themes/components/table/table";
import DropdownMenu from "@/themes/components/dropdown-menu/dropdown-menu";
import Icons from "@/themes/images/icons/icons";
import styles from "./role-listing.module.scss";
import EditRoleModal from "../role-modal/edit-role-modal/edit-role";

interface Role {
  key: string;
  role: string;
  department: string;
  users: number;
  status: string;
}

const data = [
  { key: "1", role: "CEO", department: "Management", users: "1 employee", status: "Active" },
  { key: "2", role: "Product Manager", department: "Operations", users: 2, status: "Active" },
  { key: "3", role: "Accountant", department: "Finance", users: 2, status: "Inactive" },
  { key: "4", role: "Team Lead - Software Development", department: "Technical", users: 30, status: "Inactive" },
  { key: "5", role: "HR Manager", department: "HR", users: 1, status: "Inactive" },
];

const departmentOptions = [
  { label: "Management", value: "Management" },
  { label: "Operations", value: "Operations" },
  { label: "Finance", value: "Finance" },
  { label: "Technical", value: "Technical" },
  { label: "HR", value: "HR" },
];

const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];

const SettingsRoleTable: React.FC = () => {
  const [statusData, setStatusData] = useState<Employee[]>(data);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleStatusChange = (key: string, newStatus: string) => {
    setStatusData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleMenuClick = (type: string, record: Role) => {
    if (type === "edit") {
      setSelectedRole(record);
      setIsModalVisible(true);
    }
  };

  const handleModalSave = () => {
    if (selectedRole) {
      setStatusData((prevData) =>
        prevData.map((item) =>
          item.key === selectedRole.key ? selectedRole : item
        )
      );
    }
    setIsModalVisible(false);
  };

  const columns: ColumnType[] = [
    { title: "Role", dataIndex: "role", key: "role", width: "25%" },
    { title: "Department", dataIndex: "department", key: "department", width: "25%" },
    { title: "No. of Users", dataIndex: "users", key: "users", width: "25%" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "25%",
      render: (status, record) => (
        <DropdownMenu
          menuItems={[
            {
              key: "active",
              label: "Active",
              onClick: () => handleStatusChange(record.key, "Active"),
            },
            {
              key: "inactive",
              label: "Inactive",
              onClick: () => handleStatusChange(record.key, "Inactive"),
            },
          ]}
          trigger={["click"]}
          icon={
            <div style={{ display: "flex", alignItems: "center" }}>
              <span
                style={{
                  color: "var(--primary-golden-color-dark)",
                  fontWeight: "var(--main-heading-font-weight)",
                  fontSize: "var(--default-font-size)",
                }}
              >
                {status}
              </span>
              &nbsp;{Icons.arrowDownFilledGold}
            </div>
          }
          wrapperClassName={styles.triggerWrapper}
        />
      ),
    },
    {
      key: "actions",
      render: (_: string, record: any) => (
        <DropdownMenu
          menuItems={[
            {
              key: "edit",
              label: "Edit",
              onClick: () => handleMenuClick("edit", record),
            },
            {
              key: "update-permissions",
              label: "Update Role Permissions",
              onClick: () => handleMenuClick("update-permissions", record),
            },
            {
              key: "map-user",
              label: "Map User",
              onClick: () => handleMenuClick("map-user", record),
            },
            {
              key: "delete",
              label: "Delete",
              onClick: () => handleMenuClick("delete", record),
            },
          ]}
          icon={Icons.threeDots}
        />
      ),
    },
  ];

  return (
    <div style={{ maxWidth: "100%" }}>
      <Table columns={columns} dataSource={statusData} />

      {isModalVisible && selectedRole && (
        <EditRoleModal
          isVisible={isModalVisible}
          role={selectedRole.role}
          department={selectedRole.department}
          status={selectedRole.status}
          departmentOptions={departmentOptions}
          statusOptions={statusOptions}
          onRoleChange={(value) =>
            setSelectedRole({ ...selectedRole, role: value })
          }
          onDepartmentChange={(value) =>
            setSelectedRole({ ...selectedRole, department: value })
          }
          onStatusChange={(value) =>
            setSelectedRole({ ...selectedRole, status: value })
          }
          onSave={handleModalSave}
          onClose={() => setIsModalVisible(false)}
          onSetPermissions={() => alert("Set Role Permissions clicked")}
        />
      )}
    </div>
  );
};

export default SettingsRoleTable;
