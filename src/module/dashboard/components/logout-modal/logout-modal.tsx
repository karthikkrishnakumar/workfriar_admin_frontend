import ModalComponent from "@/themes/components/modal/modal";
import styles from "./logout-modal.module.scss";
import ButtonComponent from "@/themes/components/button/button";
import { useAuthService } from "@/module/auth/services/auth-service/auth-service";
import { Spin } from "antd";
import { useState } from "react";

const { 
  handleLogout
} = useAuthService();

interface LogoutModalProps {
  onClose: () => void; // Function to handle closing the modal
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {

  const [loading, setLoading] = useState(false);
  /**
   * Handles  logout.
   *
   */
  const handleUserLogout = async () => {
    try {
      setLoading(true);
      const response = await handleLogout();
      if (response.success) {
        window.location.href = "/";
      }
    }catch (error) {
      console.error("Failed to logout user");
    } finally {
      onClose();
      setLoading(false);
    }
    
    
  };


  return (
    <div className={styles.LoginForm}>
      {loading && (
                    <div className={styles.loaderOverlay}>
                        <Spin size="large" className={styles.customspinner} />
                    </div>
                )}
      <div>
        <ModalComponent
          isVisible={true}
          title={"Logout?"}
          content={
            <div className={styles.centreContent}>
              You are about to logout . Are you sure you want to logout
            </div>
          }
          bottomContent={
            <div>
              <ButtonComponent theme="white" label="Cancel" onClick={onClose} />
              <ButtonComponent theme="danger" label="Logout" onClick={handleUserLogout}/>
            </div>
          }
          onClose={onClose}
          theme="danger"
          className={styles.customModal}
        />
      </div>
    </div>
  );
};

export default LogoutModal;
