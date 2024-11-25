"use client";
import React, { useState } from "react";

import styles from "./modal-input-content.module.scss";
import CustomInputField from "@/themes/components/input-field/input-field";
import CustomSelect from "@/themes/components/select-field/select-field";

interface FieldConfig {
  label: string;
  value: string | number | undefined;
  options?: { label: string; value: string | number }[];
}

interface ModalSelectContentProps {
  inputField: FieldConfig;
  selectFields: FieldConfig[];
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
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const handleSelectChange = (label: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  return (
    <div className={styles.gridContainer}>
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
