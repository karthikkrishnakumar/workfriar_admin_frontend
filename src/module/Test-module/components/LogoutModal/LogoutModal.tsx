import styles from "./LogoutModal.module.scss";
import ModalComponent from "@/themes/components/Modal/Modal";

const LogoutModal = () => {
  return (
    <div className={styles.LoginForm}>
      <div>
        <ModalComponent
          isVisible={true}
          title={"Logout?"}
          content={
            <div>You are about to logout . Are you sure you want to logout</div>
          }
          primaryButtonLabel={"cancel"}
          secondaryButtonLabel={"logout"}
      
        />
      </div>
    </div>
  );
};

export default LogoutModal;
