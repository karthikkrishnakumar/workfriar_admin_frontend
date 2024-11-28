import React from "react";
import styles from "./text-area-button.module.scss";
import Icons from "@/themes/images/icons/icons";

interface TextAreaButtonProps {
  buttonvalue: string;
  onclickFunction?: () => void;
  disabled?: boolean;
}
const TextAreaButton: React.FC<TextAreaButtonProps> = ({
  buttonvalue,
  onclickFunction,
  disabled = false,
}) => {
  return (
    <button
      className={`${styles.textAreaButtonWrapper} ${
        disabled ? styles.disabled : ""
      }`}
    >
      <span className={styles.buttonValue}>{buttonvalue}</span>
      <span className={styles.editIcon}>{Icons.editPencil}</span>
    </button>
  );
};

export default TextAreaButton;
