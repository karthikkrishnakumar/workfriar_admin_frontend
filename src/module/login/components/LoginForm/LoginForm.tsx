"use client";
import Button from "@/themes/components/Button/Button";
import styles from "./LoginForm.module.scss";

const LoginForm = () => {
  return (
    <div className={styles.LoginForm}>
      <div className={styles.buttons}>
        <Button label="Save" theme="black" />
        <Button label="Cancel" theme="white" />
      </div>
    </div>
  );
};

export default LoginForm;
