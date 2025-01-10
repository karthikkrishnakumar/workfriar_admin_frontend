"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Skeleton, message } from "antd";
import CheckboxComponent from "@/themes/components/checkbox/checkbox";
import Table from "@/themes/components/table/table";
import ButtonComponent from "@/themes/components/button/button";
import styles from "./update-role-permissions.module.scss";
import useRoleService from "../../services/role-service";
import { CATEGORIES } from "../../constants";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (roleId) {
      setLoading(true); 
      fetchPermissionsByRoleId(roleId).then((response) => {
        if (response.data && response.data.length > 0) {
          setPermissions(mapPermissionsToState(response.data));
        } else {
          setPermissions(getDefaultPermissions());
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

  // Handle checkbox changes with auto-check view for other actions
  const handleCheckboxChange = (field: string, key: string, checked: boolean) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.key === key) {
          // If unchecking view, uncheck all other actions
          if (field === 'view' && !checked) {
            return { 
              ...item, 
              view: false,
              createEdit: false,
              review: false,
              delete: false
            };
          }
          
          // If any action other than view is checked, ensure view is true
          const newView = field === 'view' 
            ? checked 
            : (checked || item.createEdit || item.review || item.delete);
          
          return { 
            ...item, 
            [field]: checked,
            view: newView
          };
        }
        return item;
      })
    );
  };

  // Save permissions - only send categories with at least one action checked
  const handleSave = async () => {
    const updatedPermissions = permissions
      .filter(({ view, createEdit, review, delete: deleteAction }) => 
        view || createEdit || review || deleteAction
      )
      .map(({ category, view, createEdit, review, delete: deleteAction }) => ({
        category,
        actions: {
          view: view,
          edit: createEdit,
          review: review,
          delete: deleteAction,
        },
      }));

    try {
      const response = await updatePermissionsByRoleId(roleId, updatedPermissions);

      if (response.status) {
        message.success('Permissions updated successfully!');
        router.back();
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
      <SkeletonLoader
      paragraph={{ rows: 25 }}
      classNameItem={styles.customSkeleton}
    />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={permissions}
            className={styles.permissionTable}
            loading={loading}
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