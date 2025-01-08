import React from "react";
import { Input } from "antd"; // Import Input from Ant Design
import styles from "./input-field.module.scss"; // SCSS module

// Define the interface for the props passed to the CustomInputField component
interface CustomInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}

const CustomInputField: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder = "Enter text",
  type
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.inputContainer}>
      <Input
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className={styles.customInput} // Apply custom styling
        type={type?type:"text"}
      />
    </div>
  );
};

export default CustomInputField;
