import React, { useEffect, useState } from "react";
import styles from "./text-area-button.module.scss";
import Icons from "@/themes/images/icons/icons";
import ModalComponent from "@/themes/components/modal/modal";
import ButtonComponent from "@/themes/components/button/button";

/**
 * Interface for the props passed to the TextAreaButton component.
 * 
 * @interface TextAreaButtonProps
 * @property {string} [buttonvalue] - The value displayed on the button.
 * @property {() => void} [onclickFunction] - Function to handle the button click.
 * @property {boolean} [disabled] - If true, disables the button.
 * @property {boolean} [showTaskDetailModal] - Determines if the task detail modal should be visible.
 * @property {string} [value] - The value to display in the text area (optional).
 * @property {(value: string) => void} [setvalue] - Function to update the value of the parent component (optional).
 * @property {boolean} [readOnly] - If true, makes the text area read-only.
 */
interface TextAreaButtonProps {
  buttonvalue?: string; // The value displayed on the button.
  onclickFunction?: () => void; // Function triggered when the button is clicked.
  disabled?: boolean; // Whether the button is disabled or not.
  showTaskDetailModal?: boolean; // Whether the modal is visible or not.
  value?: string; // Value for the text area.
  setvalue?: (value: string) => void; // Function to update the parent component's state.
  readOnly?: boolean; // If true, the text area will be read-only.
}

/**
 * TextAreaButton component displays a button that triggers a modal with a text area. 
 * It allows the user to edit and save a task description, with optional read-only functionality.
 * 
 * @param {TextAreaButtonProps} props - The props for the component.
 * @returns {JSX.Element} The rendered TextAreaButton component.
 */
const TextAreaButton: React.FC<TextAreaButtonProps> = ({
  buttonvalue,
  onclickFunction,
  disabled = false,
  showTaskDetailModal = false,
  value,
  setvalue,
  readOnly = false,
}) => {
  // Local state for the text area value
  const [textAreaValue, setTextAreaValue] = useState<string>("");


  useEffect(() => {
    setTextAreaValue(value!); // Update local state when the value prop changes
  },[value])

  /**
   * Handles saving the text area value and updating the parent component's state.
   */
  const handleSave = () => {
    if (setvalue) {
      setvalue(textAreaValue!); // Update parent state with the text area value
    }
    if (onclickFunction) {
      onclickFunction(); // Close the modal
    }
  };

  return (
    <>
      {/* Button to trigger the modal */}
      <button
        className={`${styles.textAreaButtonWrapper} ${
          disabled ? styles.disabled : ""
        }`}
        onClick={onclickFunction} // Trigger modal when clicked
        disabled={disabled}
      >
        <span className={styles.buttonValue}>
          {buttonvalue ? buttonvalue : "Add task description"} {/* Button text */}
        </span>
        {!readOnly && (
          <span className={styles.editIcon}>{Icons.editPencil}</span> // Edit icon (only if not read-only)
        )}
      </button>

      {/* Modal displaying the text area */}
      <ModalComponent
        className={styles.textAreaModal}
        isVisible={showTaskDetailModal} // Control modal visibility
        theme="normal"
        title="Task"
        onClose={onclickFunction} // Close the modal
        content={
          <div className={styles.textAreaWrapper}>
            <textarea
              className={styles.textArea}
              maxLength={200} // Maximum character length for the description
              placeholder="Add Task description here..."
              value={textAreaValue} // The value of the text area
              onChange={(e) => setTextAreaValue(e.target.value)} // Update local state on change
              readOnly={readOnly} // Disable editing if readOnly is true
            />
            {!readOnly && <p>Maximum 200 characters.</p>} {/* Display character limit message if not read-only */}
            <div className={styles.actionButtons}>
              {/* Save button only visible if not read-only */}
              {!readOnly && (
                <ButtonComponent
                  label="Save"
                  theme="black"
                  onClick={handleSave} // Save the description
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
