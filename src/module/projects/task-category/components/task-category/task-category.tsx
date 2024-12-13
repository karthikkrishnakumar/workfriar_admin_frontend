"use client";
import React, { useEffect, useState } from "react";
import { Dropdown, Tag, message } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import styles from "./task-category.module.scss";
import AddTaskCategoryModal from "../add-task-category-modal/add-task-category-modal";
import EditTaskCategoryModal from "../edit-task-category-modal/edit-task-category-modal";
import useTaskCategoryService, {
  TaskCategoryData,
} from "../../services/task-category-service";
import CustomTable, {
  Column,
  RowData,
} from "@/themes/components/custom-table/custom-table";

const TaskCategory: React.FC = () => {
  const {
    addTaskCategory,
    changeTimeEntry,
    fetchTaskCategoryDetails,
    updateTaskCategory,
  } = useTaskCategoryService();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filteredTaskCategory, setFilteredTaskCategory] = useState<RowData[]>(
    []
  );
  const [selectedTaskCategory, setSelectedTaskCategory] =
    useState<TaskCategoryData | null>(null);
  const [taskCategoryData, setTaskCategoryData] = useState<TaskCategoryData[]>(
    []
  );

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const result = await fetchTaskCategoryDetails(); // Make sure you pass the ID
        setTaskCategoryData(result);
        setFilteredTaskCategory(mapCategoryData(result)); // Map the data to RowData format
      } catch (error) {
        message.error("Failed to fetch project details.");
      }
    };

    fetchDetails();
  }, []);


  /**
   * Toggles the time entry status between "closed" and "opened"
   * @param {string} key - The key of the TaskCategory to update
   */
  const handleTimeEntryChange = async (key: string) => {
    try {
      setTaskCategoryData((prevData) => {
        const updatedData = prevData.map((item) =>
          item._id === key
            ? {
                ...item,
                timeEntry: item.timeEntry === "closed" ? "opened" : "closed",
              }
            : item
        );
        setFilteredTaskCategory(mapCategoryData(updatedData)); // Re-map to RowData format
        return updatedData;
      });
      const response = await changeTimeEntry(key);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
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
  const handleEditTaskCategorySubmit = async (values: Record<string, any>) => {
    try {
      const response = await updateTaskCategory(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsEditModalOpen(false); // Close modal after submission
  };

  /**
   * Handles the form submission from the AddTaskCategoryModal
   * @param {Record<string, any>} values - The values for the new task category
   */
  const handleAddTaskCategorySubmit = async (values: Record<string, any>) => {
    try {
      const response = await addTaskCategory(values);
      console.log(response);
    } catch (err) {
      console.log("Failed.");
    }
    setIsAddModalOpen(false); // Close modal after submission
  };

  const columns: Column[] = [
    { title: "Task category", key: "task_category", align: "left" },
    { title: "Time entry", key: "timeEntry", align: "left", width: 400 },
    { title: "", key: "action", align: "left", width: 40 },
  ];
  // Function to map category data to RowData format for compatibility with the table
  const mapCategoryData = (categorys: TaskCategoryData[]): RowData[] => {
    const handleMenuClick = (e: { key: string }, category: TaskCategoryData) => {
      if (e.key === "Edit") {
        if (category._id) {
          handleEditTaskCategory(category);
        }
      } else if (e.key === "Update-timeEntry") {
        if (category._id) {
          handleTimeEntryChange(category._id);
        }
      }
    };
    return categorys.map((category) => ({
      _id: category._id,
      task_category: (
        <span className={styles.category}>{category.task_category}</span>
      ),
      timeEntry: (
        <Tag className={`${styles.timeEntryBtn} ${styles[category.timeEntry]}`}>
          {category.timeEntry.charAt(0).toUpperCase() +
            category.timeEntry.slice(1)}
        </Tag>
      ),
      action: (
        <span className={styles.actionCell}>
          <Dropdown
            menu={{
              items: [
                { key: "Edit", label: "Edit" },
                {
                  key: "Update-timeEntry",
                  label:
                    category.timeEntry === "closed"
                      ? "Open entry"
                      : "Close entry",
                },
              ],
              onClick: (e) => handleMenuClick(e, category),
            }}
            trigger={["click"]}
          >
            <MoreOutlined className={styles.threeDotButton} />
          </Dropdown>
        </span>
      ),
    }));
  };
  return (
    <div className={styles.tableWrapper}>
      <CustomTable columns={columns} data={filteredTaskCategory} />
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
