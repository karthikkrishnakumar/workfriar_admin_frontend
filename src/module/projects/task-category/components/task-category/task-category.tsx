"use client";
import React, { useState } from "react";
import { Table, Button, Dropdown, Tag } from "antd";
import type { MenuProps } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./task-category.module.scss";
import AddTaskCategoryModal from "../add-task-category-modal/add-task-category-modal";
import EditTaskCategoryModal from "../edit-task-category-modal/edit-task-category-modal";

/**
 * Interface representing the TaskCategory data structure.
 * @interface TaskCategoryData
 */
interface TaskCategoryData {
  key: string;
  task_category: string;
  timeEntry: "closed" | "opened";
}

const TaskCategory: React.FC = () => {
  const data: TaskCategoryData[] = [
    {
      key: "1",
      task_category: "Testing",
      timeEntry: "closed",
    },
    {
      key: "2",
      task_category: "Development",
      timeEntry: "closed",
    },
  ];

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedTaskCategory, setSelectedTaskCategory] =
    useState<TaskCategoryData | null>(null);
  const [TaskCategoryData, setTaskCategoryData] =
    useState<TaskCategoryData[]>(data);

  /**
   * Toggles the time entry status between "closed" and "opened"
   * @param {string} key - The key of the TaskCategory to update
   */
  const handleTimeEntryChange = (key: string) => {
    setTaskCategoryData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              timeEntry: item.timeEntry === "closed" ? "opened" : "closed",
            }
          : item
      )
    );
  };

  /**
   * Opens the edit modal with the selected TaskCategory's data
   * @param {TaskCategoryData} TaskCategory - The TaskCategory to edit
   */
  const handleEditTaskCategory = (TaskCategory: TaskCategoryData) => {
    setSelectedTaskCategory(TaskCategory);
    setIsEditModalOpen(true);
  };

  /**
   * Handles the form submission from the EditTaskCategoryModal
   * @param {Record<string, any>} values - The updated values for the TaskCategory
   */
  const handleEditTaskCategorySubmit = (values: Record<string, any>) => {
    console.log("Updated TaskCategory Details:", values);
    setIsEditModalOpen(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddTaskCategoryModal
   * @param {Record<string, any>} values - The values for the new task category
   */
  const handleAddTaskCategorySubmit = (values: Record<string, any>) => {
    console.log("Updated TaskCategory Details:", values);
    setIsAddModalOpen(false); // Close modal after submission
  };

  const columns = [
    {
      title: "Task category",
      dataIndex: "task_category",
      key: "task_category",
      width: "60%",
    },
    {
      title: "Time entry",
      dataIndex: "timeEntry",
      key: "timeEntry",
      width: "30%",
      render: (timeEntry: TaskCategoryData["timeEntry"]) => (
        <Tag className={`${styles.timeEntryBtn} ${styles[timeEntry]}`}>
          {timeEntry.charAt(0).toUpperCase() + timeEntry.slice(1)}
        </Tag>
      ),
    },
    {
      title: "",
      key: "action",
      width: "5%",
      render: (record: TaskCategoryData) => {
        const dynamicActionItems: MenuProps["items"] = [
          {
            key: "edit",
            label: <div className={styles.dropdownItem}>Edit</div>,
            onClick: () => handleEditTaskCategory(record),
          },
          {
            key: "entry",
            label: (
              <div
                className={styles.dropdownItem}
                onClick={() => handleTimeEntryChange(record.key)}
              >
                {record.timeEntry === "closed" ? "Open entry" : "Close entry"}
              </div>
            ),
          },
        ];

        return (
          <Dropdown
            menu={{ items: dynamicActionItems }}
            trigger={["click"]}
            placement="bottomRight"
            dropdownRender={(menu) => (
              <div className={styles.dropdownMenu}>{menu}</div>
            )}
          >
            <Button
              type="text"
              icon={
                <MoreOutlined style={{ fontSize: "18px", color: "black" }} />
              }
              className={styles.actionButton}
            />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className={styles.tableWrapper}>
      <Table
        columns={columns}
        dataSource={TaskCategoryData}
        pagination={false}
        className={styles.table}
      />
      <EditTaskCategoryModal
        isEditModalOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditTaskCategorySubmit}
        initialValues={selectedTaskCategory}
      />
      <AddTaskCategoryModal
        isAddModalOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddTaskCategorySubmit}
      />
    </div>
  );
};

export default TaskCategory;
