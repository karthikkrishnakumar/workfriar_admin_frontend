"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import { AddModalProps } from "@/module/project-forecast/project-forecast/components/add-forecast-modal/add-forecast-modal";


const AddTaskCategoryModal: React.FC<AddModalProps> = ({
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
