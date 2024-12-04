"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";


interface AddTaskCategoryModalProps {
  isAddModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
}

const AddTaskCategoryModal: React.FC<AddTaskCategoryModalProps> = ({
  isAddModalOpen,
  onClose,
  onSave,
}) => {

  return (
    <ModalFormComponent
      isVisible={isAddModalOpen}
      onClose={onClose}
      title={"Add Task Category"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      onPrimaryClick={onSave}
      formRows={[
        {
          fields: [
            {
              name: "task_category",
              label: "Task category",
              type: "text",
              required: true,
              placeholder:"Enter task category"
            },
            {
              name: "time_entry",
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

export default AddTaskCategoryModal;
