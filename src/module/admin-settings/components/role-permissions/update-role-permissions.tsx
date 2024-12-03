"use client";

import CheckboxComponent from "@/themes/components/checkbox/checkbox";
import Table from "@/themes/components/table/table";

import React from "react";

const CustomCheckbox = ({ checked, onChange }) => (
  <CheckboxComponent checked={checked} onChange={onChange} />
);

const UpdateRolePermissionsTable = () => {
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "View",
      dataIndex: "view",
      key: "view",
      render: (_, record) => (
        <CustomCheckbox
          checked={record.view}
          onChange={(e) => handleCheckboxChange("view", record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Create/Edit",
      dataIndex: "createEdit",
      key: "createEdit",
      render: (_, record) => (
        <CustomCheckbox
          checked={record.createEdit}
          onChange={(e) => handleCheckboxChange("createEdit", record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Review",
      dataIndex: "review",
      key: "review",
      render: (_, record) => (
        <CustomCheckbox
          checked={record.review}
          onChange={(e) => handleCheckboxChange("review", record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (_, record) => (
        <CustomCheckbox
          checked={record.delete}
          onChange={(e) => handleCheckboxChange("delete", record.key, e.target.checked)}
        />
      ),
    },
  ];

  const data = [
    {
      key: "1",
      category: "Timesheet",
      view: true,
      createEdit: true,
      review: true,
      delete: true,
    },
    {
      key: "2",
      category: "Projects",
      view: true,
      createEdit: true,
      review: true,
      delete: true,
    },
    {
      key: "3",
      category: "Task category",
      view: false,
      createEdit: false,
      review: true,
      delete: true,
    },
    {
      key: "4",
      category: "Project Team",
      view: false,
      createEdit: false,
      review: true,
      delete: true,
    },
    {
      key: "5",
      category: "Clients",
      view: true,
      createEdit: true,
      review: true,
      delete: true,
    },
    {
      key: "6",
      category: "Users",
      view: true,
      createEdit: true,
      review: true,
      delete: true,
    },
    {
      key: "7",
      category: "Project Forecast",
      view: false,
      createEdit: false,
      review: true,
      delete: true,
    },
  ];

  const handleCheckboxChange = (field, key, checked) => {
    console.log(`${field} for ${key} changed to ${checked}`);
  };

  return <Table columns={columns} dataSource={data} />;
};

export default UpdateRolePermissionsTable;
