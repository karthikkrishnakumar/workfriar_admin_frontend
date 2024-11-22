import React, { ChangeEvent, ReactNode } from "react";
import styles from "./icon-inputfield.module.scss";
import { Input } from "antd"; // Ant Design's Input component

interface IconInputFieldProps {
  iconPosition: "left" | "right"; // Position of the icon (left or right)
  icon: ReactNode; // The icon to display within the input field
  placeholder: string; // Placeholder text for the input field
  value: string; // Current value of the input field
  onChange: (value: string) => void; // Function to handle value change
  type?: string; // Input type (e.g., text, password, etc.)
}

/**
 * A reusable input field component with an icon, supporting dynamic icon positions.
 *
 * @param {IconInputFieldProps} props - Props passed to the component.
 * @returns {JSX.Element} The rendered IconInputField component.
 */
const IconInputField: React.FC<IconInputFieldProps> = ({
  iconPosition,
  icon,
  placeholder,
  value,
  onChange,
  type,
}) => {
  /**
   * Handles input change events and calls the onChange handler with the new value.
   *
   * @param {ChangeEvent<HTMLInputElement>} e - The input change event.
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Pass the updated input value to the parent component
  };

  return (
    <div
      className={
        iconPosition === "left"
          ? styles.iconInputFieldLeftWrapper // Apply left icon styles
          : styles.iconInputFieldRightWrapper // Apply right icon styles
      }
    >
      {/* Icon displayed within the input field */}
      <span className={styles.icon}>{icon}</span>

      {/* Input field with placeholder, value, and change handler */}
      <Input
        type={type} // Input type (e.g., text, password, etc.)
        placeholder={placeholder} // Placeholder text for the input field
        value={value} // Current input value
        onChange={handleInputChange} // Change handler for the input field
        className={styles.inputfield} // Custom styling for the input field
      />
    </div>
  );
};

export default IconInputField;
