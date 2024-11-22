import ModalComponent from "@/themes/components/modal/modal";
import styles from "./logout-modal.module.scss";

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
          primaryButtonLabel={"Cancel"}
          secondaryButtonLabel={"Logout"}
        />
      </div>
    </div>
  );
};

export default LogoutModal;
