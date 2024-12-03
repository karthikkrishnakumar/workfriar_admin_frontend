import React from "react";
import { Select } from "antd";
import styles from "./select-field.module.scss"; // Import the SCSS module

const { Option } = Select;

// Define the interface for the option object
interface SelectOption {
  label: string;
  value: string | number;
}

// Define the interface for the props passed to the CustomSelect component
interface CustomSelectProps {
  options: SelectOption[];
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
}) => {
  return (
    <div className={styles.customSelectContainer}>
      {" "}
      {/* Apply container class */}
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.customSelect} // Apply select styling
      >
        {options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
