import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import styles from "./input-field.module.scss";

interface CustomInputProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
  prefix?: React.ReactNode;
  onFocus?: () => void;
  error?: string;
  validateInput?: (value: string) => boolean;
}

const CustomInputField: React.FC<CustomInputProps> = ({
  value = "",
  onChange,
  placeholder = "Enter text",
  type = "text",
  className = "",
  disabled = false,
  maxLength,
  prefix,
  onFocus,
  error,
  validateInput,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [localError, setLocalError] = useState<string | undefined>(error);

  // Update local error when prop error changes
  useEffect(() => {
    setLocalError(error);
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Clear local error when user starts typing
    if (localError) {
      setLocalError(undefined);
    }

    // Optional input validation
    if (validateInput && !validateInput(inputValue)) {
      // You can set a specific validation error here if needed
      setLocalError("Invalid input");
      return;
    }

    onChange(inputValue);
  };

  const handleFocus = () => {
    // Clear any existing errors when input is focused
    if (localError) {
      setLocalError(undefined);
    }
    
    // Call the onFocus prop if provided
    onFocus && onFocus();
  };

  return (
    <div className={styles.inputContainer}>
      <Input
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        placeholder={placeholder}
        type={type === "password" && !isPasswordVisible ? "password" : "text"}
        disabled={disabled}
        maxLength={maxLength}
        prefix={prefix}
        className={`
          ${styles.customInput} 
          ${className} 
          ${localError ? styles.inputError : ''}
        `}
        suffix={
          type === "password" ? (
            isPasswordVisible ? (
              <EyeInvisibleOutlined 
                onClick={() => setIsPasswordVisible(false)} 
                className={styles.eyeIcon} 
              />
            ) : (
              <EyeOutlined 
                onClick={() => setIsPasswordVisible(true)} 
                className={styles.eyeIcon} 
              />
            )
          ) : null
        }
      />
      {localError && (
        <div className={styles.errorMessage}>
          {localError}
        </div>
      )}
    </div>
  );
};

export default CustomInputField;