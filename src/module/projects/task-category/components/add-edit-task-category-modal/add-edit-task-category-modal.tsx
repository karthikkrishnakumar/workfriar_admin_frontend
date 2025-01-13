"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import { TaskCategoryData } from "../../services/task-category-service";

interface TaskCategoryModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues?: TaskCategoryData | null;
  type?: string;
}

const TaskCategoryModal: React.FC<TaskCategoryModalProps> = ({
  isModalOpen,
  onClose,
  onSave,
  initialValues,
  type,
}) => {
  const values = initialValues || {
    id: "",
    category: "",
    timeentry: "opened",
  };

  return (
    <ModalFormComponent
      isVisible={isModalOpen}
      onClose={onClose}
      title={type === "edit" ? "Edit Task Category" : "Add Task Category"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      initialValues={values}
      onPrimaryClick={onSave}
      formRows={[
        {
          fields: [
            {
              name: "category",
              label: "Task category",
              type: "text",
              required: true,
              placeholder: "Enter task category",
            },
            {
              name: "timeentry",
              label: "Time entry",
              type: "select",
              options: [
                { label: "Opened", value: "opened" },
                { label: "Closed", value: "closed" },
              ],
              required: true,
              placeholder: "Select time entry",
            },
          ],
        },
      ]}
    />
  );
};

export default TaskCategoryModal;
