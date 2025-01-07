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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { closeModal } from "@/redux/slices/modalSlice";

const TaskCategory: React.FC = () => {
  const dispatch = useDispatch();
  const { isOpen, modalType } = useSelector((state: RootState) => state.modal);
  const {
    addTaskCategory,
    fetchTaskCategoryDetails,
    updateTaskCategory,
  } = useTaskCategoryService();
  const [selectedId, setSelectedId] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [filteredTaskCategory, setFilteredTaskCategory] = useState<RowData[]>(
    []
  );
  const [selectedTaskCategory, setSelectedTaskCategory] =
    useState<TaskCategoryData | null>(null);

  // useEffect hook to fetch forecast data based on the ID when the component mounts
  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = async () => {
    try {
      const result = await fetchTaskCategoryDetails(); 
      setFilteredTaskCategory(mapCategoryData(result.data)); // Map the data to RowData format
    } catch (error) {
      message.error("Failed to fetch project details.");
    }
  };

  /**
   * Toggles the time entry status between "closed" and "opened"
   * @param {string} key - The key of the TaskCategory to update
   */
  const handleTimeEntryChange = async (category: TaskCategoryData) => {
    try {
      const timeentry = category.timeentry === "closed"
      ? "opened"
      : "closed"
      const payload = {
        ...category,
        timeentry:timeentry
      } 
      const response = await updateTaskCategory(payload);
      if(response.status){
        message.success(response.message)
      }
      else{
        message.error(response.message)
      }
      fetchDetails();
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
    setSelectedId(TaskCategory.id);
    setIsEditModalOpen(true);
  };

  /**
   * Handles the form submission from the EditTaskCategoryModal
   * @param {Record<string, any>} values - The updated values for the TaskCategory
   */
  const handleEditTaskCategorySubmit = async (values: Record<string, any>) => {
    try {
      
      const payload = {
        ...values,
        id:selectedId
      } 
      const response = await updateTaskCategory(payload);
      if(response.status){
        message.success(response.message)
      }
      else{
        message.error(response.errors)
      }
      fetchDetails();
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
    console.log(values);
    try {
      const response = await addTaskCategory(values);
      console.log(response);
      if(response.status){
        message.success(response.message)
      }
      else{
        message.error(response.errors)
      }
      fetchDetails();
    } catch (err) {
      console.log("Failed.");
    }
    dispatch(closeModal())
  };

  const columns: Column[] = [
    { title: "Task category", key: "task_category", align: "left" },
    { title: "Time entry", key: "timeEntry", align: "left", width: 400 },
    { title: "", key: "action", align: "left", width: 40 },
  ];
  // Function to map category data to RowData format for compatibility with the table
  const mapCategoryData = (categorys: TaskCategoryData[]): RowData[] => {
    const handleMenuClick = (
      e: { key: string },
      category: TaskCategoryData
    ) => {
      if (e.key === "Edit") {
        if (category.id) {
          handleEditTaskCategory(category);
        }
      } else if (e.key === "Update-timeEntry") {
        if (category.id) {
          handleTimeEntryChange(category);
        }
      }
    };
    return categorys.map((category) => ({
      _id: category.id,
      task_category: (
        <span className={styles.category}>{category.category}</span>
      ),
      timeEntry: (
        <Tag className={`${styles.timeEntryBtn} ${styles[category.timeentry]}`}>
          {category.timeentry.charAt(0).toUpperCase() +
            category.timeentry.slice(1)}
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
                    category.timeentry === "closed"
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
      {isEditModalOpen && (
             <EditTaskCategoryModal
             isEditModalOpen={isEditModalOpen}
             onClose={() => setIsEditModalOpen(false)}
             onSave={handleEditTaskCategorySubmit}
             initialValues={selectedTaskCategory}
           />
      )}
            {isOpen && modalType === "addModal" && (
      <AddTaskCategoryModal
      isAddModalOpen={true}
      onClose={() => dispatch(closeModal())}
      onSave={handleAddTaskCategorySubmit}
    />
      )}

    </div>
  );
};

export default TaskCategory;
