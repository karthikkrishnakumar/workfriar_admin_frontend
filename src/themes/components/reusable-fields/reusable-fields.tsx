import React from "react";
import { Form, Select, DatePicker, Input } from "antd";
import moment from "moment";
import Icons from "@/themes/images/icons/icons";
import styles from "./reusable-fields.module.scss"; // You'll need to create this SCSS module

const { Option } = Select;

/**
 * FormField component renders a dynamic form field with different types of input fields (select, datepicker, input, textarea).
 * @param {Object} props - The component props.
 * @param {"select" | "datepicker" | "input" | "textarea"} props.type - The type of input field to render.
 * @param {string} props.label - The label to display for the form field.
 * @param {string} props.name - The name of the form field (used for form submission).
 * @param {boolean} [props.required=false] - Whether the field is required (defaults to `false`).
 * @param {any} [props.value] - The value of the field (for controlled components).
 * @param {function} [props.onChange] - A callback function that is called when the field value changes.
 * @param {string} [props.placeholder] - Placeholder text displayed when the field is empty.
 * @param {Array<{value: string, label: string}>} [props.options=[]] - An array of options for the select input.
 * @param {string} [props.className] - Additional class name(s) for custom styling.
 * @param {number} [props.rows=4] - The number of rows for a textarea input (defaults to `4`).
 * @param {React.ReactNode} [props.suffixIcon] - Optional suffix icon to be displayed at the end of the input.
 */

export type InputType = "select" | "datepicker" | "input" | "textarea";

export interface FormFieldProps {
  type: InputType;
  label: string;
  name: string;
  required?: boolean;
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  className?: string;
  rows?: number;
  suffixIcon?: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  name,
  required = false,
  value,
  onChange,
  placeholder,
  options = [],
  className,
  rows = 4,
  suffixIcon,
}) => {
  // Function to render the label with optional required indicator
  const renderLabel = () => (
    <div className={styles.labelWrapper}>
      {label}
      {required && <span className={styles.requiredIndicator}>*</span>}
    </div>
  );

  console.log(value);

  // Correctly handle onChange for different field types
  const handleChange = (val: any) => {
    if (onChange) {
      onChange(val); // Pass the extracted value to the parent handler
    }
  };
  // Function to render the input field based on the type of field (select, datepicker, textarea, input)

  const renderField = () => {
    switch (type) {
      case "select": // If the field is a select dropdown
        return (
          <Select
            value={value}
            onChange={handleChange}
            suffixIcon={suffixIcon || Icons.arrowDownOutline}
            className={`${styles.customSelect} ${className}`}
            placeholder={placeholder}
          >
            {options.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );

      case "datepicker": // If the field is a date picker
        return (
          <DatePicker
            value={value ? moment(value) : null}
            onChange={(date, dateString) => handleChange(dateString)}
            className={`${styles.customDatePicker} ${className}`}
            placeholder={placeholder ?? "dd/mm/yyyy"}
            suffixIcon={suffixIcon ?? Icons.calender}
          />
        );

      case "textarea": // If the field is a textarea
        return (
          <Input.TextArea
            value={value || null}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className={`${styles.customTextarea} ${className}`}
          />
        );

      case "input": // Default case is input field (text input)
      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            placeholder={placeholder}
            className={`${styles.customInput} ${className}`}
          />
        );
    }
  };

  return (
    // Form item that encapsulates the input field and label
    <Form.Item
      label={<span style={{ color: "#6c757d" }}>{renderLabel()}</span>}
      required={required}
      className={styles.formItems}
    >
      {renderField()}
      {/* Render the corresponding input field */}
    </Form.Item>
  );
};

export default FormField;
