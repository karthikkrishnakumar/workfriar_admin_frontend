import React from "react";
import { Select } from "antd";
import styles from "./select-field.module.scss"; // Import the SCSS module

const { Option } = Select;

interface SelectOption {
  label: string;
  value: string | number | boolean;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string | number | boolean | undefined;
  onChange: (value: string | number | boolean) => void;
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
      <Select
        value={value !== undefined ? value : null} // Ensure false is not treated as undefined
        onChange={onChange}
        placeholder={placeholder}
        className={styles.customSelect}
        allowClear // Optional: Allows clearing the selection
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
