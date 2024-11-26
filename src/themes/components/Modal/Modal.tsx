import { Modal } from "antd";
import { ReactNode } from "react";
import styles from "./modal.module.scss";
import ButtonComponent from "../button/button";


interface ModalProps {
  isVisible: boolean;
  title: string;
  content?: ReactNode;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  theme?: "normal" | "danger" | "primary"; // Define themes
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  onClose?: () => void;
}

const ModalComponent: React.FC<ModalProps> = ({
  isVisible,
  title,
  content,
  primaryButtonLabel,
  secondaryButtonLabel,
  theme = "danger", // Default theme is "normal"
  onPrimaryClick,
  onSecondaryClick,
  onClose,
}) => {
  const themeStyles = {
    normal: {
      primaryButtonTheme: "white",
      secondaryButtonTheme: "black",
      titleClass: styles.normalTitle,
    },
    danger: {
      primaryButtonTheme: "white",
      secondaryButtonTheme: "danger",
      titleClass: styles.dangerTitle,
    },
    primary: {
      primaryButtonTheme: "white",
      secondaryButtonTheme: "blue",
      titleClass: styles.primaryTitle,
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <Modal open={isVisible} footer={null} onCancel={onClose}>
      <div className={`${styles.title} ${currentTheme.titleClass}`}>
        {title}
      </div>
      {content}
      <div className={styles.buttonsContainer}>
        <ButtonComponent
          label={primaryButtonLabel}
          theme={
            currentTheme.primaryButtonTheme as "black" | "white" | "danger"
          }
          onClick={onPrimaryClick}
        />
        <ButtonComponent
          label={secondaryButtonLabel}
          theme={
            currentTheme.secondaryButtonTheme as "black" | "white" | "danger"
          }
          onClick={onSecondaryClick}
        />
      </div>
    </Modal>
  );
};

export default ModalComponent;
