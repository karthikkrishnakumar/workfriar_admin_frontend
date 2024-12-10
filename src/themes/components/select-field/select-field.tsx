import React from "react";
import { Select } from "antd";
import styles from "./select-field.module.scss"; // Import the SCSS module

const { Option } = Select;

// Update the interface to accept boolean as well
interface SelectOption {
  label: string;
  value: string | number | boolean; // Updated type to allow boolean
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string | number | boolean | undefined; // Updated to accept boolean as well
  onChange: (value: string | number | boolean) => void; // Updated to accept boolean as well
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
          <Option key={option.value.toString()} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default CustomSelect;
