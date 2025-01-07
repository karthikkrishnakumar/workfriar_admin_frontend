"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";

export interface ModalProps {
  isModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
}

const EffectiveDateModal: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  onSave,
}) => {

  return (
    <>
        <ModalFormComponent
          isVisible={isModalOpen}
          onClose={onClose}
          onPrimaryClick={onSave}
          onSecondaryClick={onClose}
          title={"Effective date"}
          formRows={[
            {
              fields: [
                {
                  name: "closeDate",
                  label: "Effective date",
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
