"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import { Dates } from "@/module/projects/project-team/services/project-team-service";

export interface ModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues: Dates | any | null;
}

const EffectiveDateModal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  onSave,
  initialValues,
}) => {
  return (
    <>
      <ModalFormComponent
        isVisible={isModalOpen}
        onClose={onClose}
        onPrimaryClick={onSave}
        onSecondaryClick={onClose}
        title={"Start and end dates"}
        initialValues={initialValues}
        formRows={[
          {
            fields: [
              {
                name: "end_date",
                label: "End date",
                type: "date",
                required: true,
              },
            ],
          },
        ]}
        primaryButtonLabel={"Save"}
        secondaryButtonLabel={"Cancel"}
      />
    </>
  );
};

export default EffectiveDateModal;
