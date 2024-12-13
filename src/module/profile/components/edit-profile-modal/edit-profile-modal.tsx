"use client";
import React from "react";
import ModalFormComponent from "@/themes/components/modal-form/modal-form";
import styles from "./edit-profile-modal.module.scss";
import Icons from "@/themes/images/icons/icons";
import { ProfileData } from "../../services/profile-service";

interface EditProfileModalProps {
  isEditModalOpen: boolean;
  onClose?: () => void;
  onSave: (values: Record<string, any>) => void;
  initialValues: ProfileData | null;
}


const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isEditModalOpen,
  onClose,
  onSave,
  initialValues,
}) => {
  const values = initialValues || {
    profile_pic: "",
        name: "",
        email: "",
        location: "",
        phone: "",
        role: "",
        reporting_manager: "",
  };

  return (
    <ModalFormComponent
      isVisible={isEditModalOpen}
      onClose={onClose}
      title={"Edit Profile"}
      primaryButtonLabel={"Save"}
      secondaryButtonLabel={"Cancel"}
      initialValues={values}
      onPrimaryClick={onSave}
      formRows={[
        {
          fields: [
            {
              name: "profile_pic",
              label: "Profile",
              type: "image",
              triggerElement: (
                <span>
                  <div className={styles.editIcon}>
                  {Icons.editTool}
                  </div>
                  
                </span>
              ),
            },
          ],
        },
        {
          fields: [
            
            {
              name: "name",
              label: "Full name",
              type: "text",
            readonly:true,
            },
            {
              name: "email",
              label: "Email",
              type: "text",
              readonly:true,

            },
          ],
        },
        {
          fields: [
            
            
            {
              name: "location",
              label: "Location",
              type: "text",
              readonly:true,

            },
            {
              name: "phone",
              label: "Phone",
              type: "text",
              readonly:true,
            
            },
          ],
        },
        {
          fields: [
            {
              name: "role",
              label: "Role",
              type: "text",
              readonly:true,
            },
            {
              name: "reporting_manager",
              label: "Reporting Manager",
              type: "text",
              readonly:true,
            },
            
          ],
        },
      
      ]}
    />
  );
};

export default EditProfileModal;
