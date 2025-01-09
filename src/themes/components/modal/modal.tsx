import { Modal } from "antd";
import { ReactNode } from "react";
import styles from "./modal.module.scss";

interface ModalProps {
  isVisible: boolean;
  title: string | React.ReactNode;
  topButtonContent?:ReactNode;
  content?: ReactNode;
  bottomContent?: ReactNode;
  theme?: "normal" | "danger" | "primary"; // Define themes
  onClose?: () => void;
  className?: string;
  classTitle?: string;
  classTopButton?:string;
  classBottom?:string;
}

const ModalComponent: React.FC<ModalProps> = ({
  isVisible,
  title,
  topButtonContent,
  content,
  bottomContent,
  theme = "danger", // Default theme is "normal"
  onClose,
  className = "",
  classTitle = "",
  classTopButton="",
  classBottom="",
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
    <Modal
      open={isVisible}
      footer={null}
      onCancel={onClose}
      className={`${styles.customModal} ${className}`}
    >
      <div className={styles.modalContent}>
        <div
          className={`${styles.title} ${currentTheme.titleClass} ${classTitle}`}
        >
          {title}
        </div>
       {/* Render topButtonContent only if provided */}
       {topButtonContent && (
          <div className={`${styles.topButtonContainer} ${classTopButton}`}>
            {topButtonContent}
          </div>
        )}

        {content}
        <div className={`${styles.buttonsContainer} ${classBottom}`}>{bottomContent}</div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
