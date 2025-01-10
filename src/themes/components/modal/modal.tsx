import { Modal } from "antd";
import { ReactNode } from "react";
import styles from "./modal.module.scss";

interface ModalProps {
  isVisible: boolean;
  title: string | React.ReactNode;
  topButtonContent?: ReactNode;
  content?: ReactNode;
  bottomContent?: ReactNode;
  theme?: "normal" | "danger" | "primary";
  onClose?: () => void;
  className?: string;
  classTitle?: string;
  classTopButton?: string;
  classBottom?: string;
  // Add optional prop to control outside click behavior
  closeOnOutsideClick?: boolean;
}

const ModalComponent: React.FC<ModalProps> = ({
  isVisible,
  title,
  topButtonContent,
  content,
  bottomContent,
  theme = "danger",
  onClose,
  className = "",
  classTitle = "",
  classTopButton = "",
  classBottom = "",
  closeOnOutsideClick = false, // Default to false to prevent outside clicks from closing
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
      maskClosable={closeOnOutsideClick}
      className={`${styles.customModal} ${className}`}
    >
      <div className={styles.modalContent}>
        <div className={`${styles.title} ${currentTheme.titleClass} ${classTitle}`}>
          {title}
        </div>
        
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