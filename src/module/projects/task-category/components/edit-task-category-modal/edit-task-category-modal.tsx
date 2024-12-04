"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";


interface EditTaskCategoryModalProps {
  isEditModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues: TaskCategoryData | null;
}
interface TaskCategoryData {
  key: string;
  task_category: string;
  timeEntry: "closed" | "opened";
}

const EditTaskCategoryModal: React.FC<EditTaskCategoryModalProps> = ({
  isEditModalOpen,
  onClose,
  onSave,
  initialValues,
}) => {
  const values = initialValues || {
    key: "",
    task_category: "",
    timeEntry: "opened",
  };

  return (
    <ModalFormComponent
      isVisible={isEditModalOpen}
      onClose={onClose}
      title={"Edit Task Category"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      initialValues={values}
      onPrimaryClick={onSave}
      formRows={[
        {
          fields: [
            {
              name: "task_category",
              label: "Task category",
              type: "text",
              required: true,
              placeholder:"Select task category"
            },
            {
              name: "timeEntry",
              label: "Time entry",
              type: "select",
              options: [
                { label: "Opened", value: "opened" },
                { label: "Closed", value: "closed" },
              ],
              required: true,
              placeholder:"Select time entry"
            },
          ],
        },
      ]}
    />
  );
};

export default EditTaskCategoryModal;
