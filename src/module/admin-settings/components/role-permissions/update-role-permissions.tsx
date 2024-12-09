"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton, message } from "antd"; // Import Skeleton and message from Ant Design
import CheckboxComponent from "@/themes/components/checkbox/checkbox";
import Table from "@/themes/components/table/table";
import ButtonComponent from "@/themes/components/button/button";
import styles from "./update-role-permissions.module.scss";
import useRoleService from "../../services/role-service";
import { CATEGORIES } from "../../constants";

const UpdateRolePermissionsTable = () => {
  const params = useParams<{ roleId: string }>();
  const roleId = params?.roleId;
  const router = useRouter();
  const { fetchPermissionsByRoleId, updatePermissionsByRoleId } = useRoleService();
  const [permissions, setPermissions] = useState<{
    key: string;
    category: string;
    view: boolean;
    createEdit: boolean;
    review: boolean;
    delete: boolean;
  }[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Fetch permissions for the role
    if (roleId) {
      setLoading(true); 
      fetchPermissionsByRoleId(roleId).then((response) => {
        if (response.data && response.data.length > 0) {
          setPermissions(mapPermissionsToState(response.data));
        } else {
          setPermissions(getDefaultPermissions()); // Set default permissions
        }
        setLoading(false); 
      }).catch(() => {
        setPermissions(getDefaultPermissions()); 
        setLoading(false); 
      });
    }
  }, [roleId]);

  // Map backend permissions to table state
  const mapPermissionsToState = (data: any) =>
    CATEGORIES.map((category) => {
      const permission = data.find((item: any) => item.category === category);
      return {
        key: category,
        category,
        view: permission?.actions.view || false,
        createEdit: permission?.actions.edit || false,
        review: permission?.actions.review || false,
        delete: permission?.actions.delete || false,
      };
    });

  // Generate default permissions with all actions unchecked
  const getDefaultPermissions = () =>
    CATEGORIES.map((category) => ({
      key: category,
      category,
      view: false,
      createEdit: false,
      review: false,
      delete: false,
    }));

  // Handle checkbox changes
  const handleCheckboxChange = (field: string, key: string, checked: boolean) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item.key === key ? { ...item, [field]: checked } : item
      )
    );
  };

  // Save permissions
  const handleSave = async () => {
    const updatedPermissions = permissions.map(({ category, ...actions }) => ({
      category,
      actions: {
        view: actions.view,
        edit: actions.createEdit,
        review: actions.review,
        delete: actions.delete,
      },
    }));

    try {
      const response = await updatePermissionsByRoleId(roleId, updatedPermissions);
      if (response.status) {
        console.log(updatedPermissions)
        message.success('Permissions updated successfully!');
        router.back(); // Navigate back after successful update
      } else {
        message.error('Failed to update permissions');
      }
    } catch (error) {
      message.error('An error occurred while updating permissions');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: "35%",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      width: "18%",
      render: (_: any, record: any) => (
        <CheckboxComponent
          checked={record.view}
          onChange={(e) =>
            handleCheckboxChange("view", record.key, e.target.checked)
          }
        />
      ),
    },
    {
      title: "Create/Edit",
      dataIndex: "createEdit",
      key: "createEdit",
      width: "18%",
      render: (_: any, record: any) => (
        <CheckboxComponent
          checked={record.createEdit}
          onChange={(e) =>
            handleCheckboxChange("createEdit", record.key, e.target.checked)
          }
        />
      ),
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      width: "18%",
      render: (_: any, record: any) => (
        <CheckboxComponent
          checked={record.review}
          onChange={(e) =>
            handleCheckboxChange("review", record.key, e.target.checked)
          }
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      width: "11%",
      render: (_: any, record: any) => (
        <CheckboxComponent
          checked={record.delete}
          onChange={(e) =>
            handleCheckboxChange("delete", record.key, e.target.checked)
          }
        />
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
        <>
        <Table
          columns={columns}
          dataSource={permissions}
          className={styles.permissionTable}
        />
        <div className={styles.actions}>
        <ButtonComponent label="Cancel" theme="white" onClick={handleCancel} />
        <ButtonComponent label="Update" theme="black" onClick={handleSave} />
        </div>
      </>
      )}
    </>
  );
};

export default UpdateRolePermissionsTable;
