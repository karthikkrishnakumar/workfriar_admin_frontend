import React from "react";
import { Input } from "antd"; // Import Input from Ant Design
import styles from "./InputField.module.scss"; // SCSS module

// Define the interface for the props passed to the CustomInputField component
interface CustomInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomInputField: React.FC<CustomInputProps> = ({
  value,
  onChange,
  placeholder = "Enter text",
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
      />
    </div>
  );
};

export default CustomInputField;
