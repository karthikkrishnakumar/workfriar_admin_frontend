import React from "react";
import styles from "./delete-role-modal.module.scss";
import ButtonComponent from "@/themes/components/button/button";
import ModalComponent from "@/themes/components/modal/modal";

import { message } from "antd";
import useRoleService from "@/module/admin-settings/services/role-service";
import { Role } from "@/interfaces/admin-settings/roles";

interface DeleteRoleModalProps {
  isVisible: boolean;
  roleData: Role; 
  onClose: () => void; 
  onRoleDeleted: () => void; // Callback to refresh the role list
}

const DeleteRoleModal: React.FC<DeleteRoleModalProps> = ({ isVisible, roleData, onRoleDeleted,onClose }) => {
  const { deleteRole } = useRoleService();

  const handleDelete = async () => {
      if(roleData.roleId){
        const  response = await deleteRole(roleData.roleId); 
        if(response.status){
          message.success(response.message)
          onRoleDeleted();
          onClose(); 
        }
        else{
          message.error(response.message)
        }
      }
  };

  const modalContent = (
    <p>
      You are about to delete {roleData.role ? `the role "${roleData.role}"` : "this role entry"}. Are you sure you want to proceed?
    </p>
  );

  const modalFooter = (
    <div className={styles.footerButtons}>
      <ButtonComponent label="Cancel" theme="white" onClick={onClose} />
      <ButtonComponent label="Delete" theme="black" onClick={handleDelete} />
    </div>
  );

  return (
    <ModalComponent
      isVisible={isVisible}
      title="Delete role entry?"
      content={modalContent}
      bottomContent={modalFooter}
      theme="danger"
      onClose={onClose}
    />
  );
};

export default DeleteRoleModal;
