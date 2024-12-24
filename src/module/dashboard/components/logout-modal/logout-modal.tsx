import ModalComponent from "@/themes/components/modal/modal";
import styles from "./logout-modal.module.scss";
import ButtonComponent from "@/themes/components/button/button";
import { useAuthService } from "@/module/auth/services/auth-service/auth-service";
const { 
  handleLogout
} = useAuthService();

interface LogoutModalProps {
  onClose: () => void; // Function to handle closing the modal
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
  /**
   * Handles  logout.
   *
   */
  const handleUserLogout = () => {
    handleLogout(); 
  };


  return (
    <div className={styles.LoginForm}>
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
        />
      </div>
    </div>
  );
};

export default LogoutModal;
