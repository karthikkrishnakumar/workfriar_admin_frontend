import ModalComponent from "@/themes/components/modal/modal";
import styles from "./logout-modal.module.scss";
import ButtonComponent from "@/themes/components/button/button";
interface LogoutModalProps {
  onClose: () => void; // Function to handle closing the modal
}

const LogoutModal: React.FC<LogoutModalProps> = ({ onClose }) => {
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
              <ButtonComponent theme="danger" label="Logout" />
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
