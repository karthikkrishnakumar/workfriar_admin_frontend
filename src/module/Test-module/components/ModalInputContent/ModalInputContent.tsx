"use client";
import React, { useState } from "react";
import CustomInputField from "@/themes/components/InputField/InputField";
import CustomSelect from "@/themes/components/SelectField/SelectField";
import styles from "./ModalInputContent.module.scss";

interface FieldConfig {
  label: string;
  value: string | number | undefined;
  options?: { label: string; value: string | number }[]; // For select fields
}

interface ModalSelectContentProps {
  inputField: FieldConfig; // Config for the input field
  selectFields: FieldConfig[]; // Array of configs for select fields
}

type FormDataType = {
  [key: string]: string | number | undefined;
};

const ModalSelectContent: React.FC<ModalSelectContentProps> = ({
  inputField,
  selectFields,
}) => {
  const initialState: FormDataType = {
    [inputField.label]: inputField.value,
    ...selectFields.reduce<FormDataType>((acc, field) => {
      acc[field.label] = field.value;
      return acc;
    }, {}),
  };

  const [formData, setFormData] = useState<FormDataType>(initialState);

  const handleInputChange = (label: string, value: string) => {
    console.log(`${label} input:`, value);
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSelectChange = (label: string, value: string | number) => {
    console.log(`${label} selected:`, value);
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className={styles.gridContainer}>
      {/* Render input field */}
      <div className={styles.gridItem}>
        <label htmlFor={inputField.label} className={styles.label}>
          {inputField.label}
        </label>
        <CustomInputField
          value={formData[inputField.label] as string}
          onChange={(value) => handleInputChange(inputField.label, value)}
          placeholder={`Enter ${inputField.label}`}
         
        />
      </div>

      {/* Render select fields */}
      {selectFields.map((field, index) => (
        <div key={index} className={styles.gridItem}>
          <label htmlFor={field.label} className={styles.label}>
            {field.label}
          </label>
          <CustomSelect
            options={field.options || []}
            value={formData[field.label]}
            onChange={(value) => handleSelectChange(field.label, value)}
            placeholder={`Select ${field.label}`}
          />
        </div>
      ))}
    </div>
  );
};

export default ModalSelectContent;
