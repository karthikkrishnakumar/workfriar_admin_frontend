import React, { useState } from "react";
import styles from "./text-area-button.module.scss";
import Icons from "@/themes/images/icons/icons";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";

interface TextAreaButtonProps {
  buttonvalue?: string;
  onclickFunction?: () => void;
  disabled?: boolean;
  showTaskDetailModal?: boolean;
  value?: string;
  setvalue?: (value: string) => void;
  readOnly?: boolean;
}

const TextAreaButton: React.FC<TextAreaButtonProps> = ({
  buttonvalue,
  onclickFunction,
  disabled = false,
  showTaskDetailModal = false,
  value = "",
  setvalue,
  readOnly = false,
}) => {
  const [textAreaValue, setTextAreaValue] = useState(value);

  const handleSave = () => {
    if (setvalue) {
      setvalue(textAreaValue); // Update parent state with the text area value
    }
    if (onclickFunction) {
      onclickFunction(); // Close the modal
    }
  };

  return (
    <>
      <button
        className={`${styles.textAreaButtonWrapper} ${
          disabled ? styles.disabled : ""
        }`}
        onClick={onclickFunction}
        disabled={disabled}
      >
        <span className={styles.buttonValue}>
          {buttonvalue ? buttonvalue : "Add task description"}
        </span>
        {!readOnly && (
          <span className={styles.editIcon}>{Icons.editPencil}</span>
        )}
      </button>

      <ModalComponent
        className={styles.textAreaModal}
        isVisible={showTaskDetailModal}
        theme="normal"
        title="Task"
        onClose={onclickFunction}
        content={
          <div className={styles.textAreaWrapper}>
            <textarea
              className={styles.textArea}
              maxLength={200}
              placeholder="Add Task description here..."
              value={textAreaValue}
              onChange={(e) => setTextAreaValue(e.target.value)} // Update local state
              readOnly={readOnly}
            />
            {!readOnly && <p>Maximum 200 characters.</p>}
            <div className={styles.actionButtons}>
              {!readOnly && (
                <ButtonComponent
                  label="Save"
                  theme="black"
                  onClick={handleSave}
                />
              )}
              <ButtonComponent
                label={readOnly ? "Close" : "Cancel"}
                theme={readOnly ? "black" : "white"}
                onClick={onclickFunction} // Close the modal without saving
              />
            </div>
          </div>
        }
      />
    </>
  );
};

export default TextAreaButton;
