"use client";

import React, { useState, useEffect } from "react";
import styles from "./time-input.module.scss";
import { Tooltip } from "antd";

interface TimeInputProps {
  /**
   * Initial value for the time input, formatted as a string (e.g., "12:34").
   */
  value?: string;
  /**
   * Callback function to update the parent component with the formatted time value.
   */
  setValue?: (value: string) => void;
  /**
   * Whether the input should be disabled.
   */
  disabled?: boolean;
  /**
   * Tooltip content while disabled.
   */
  tooltipContent?: string;
  /**
   * is readonly
   */
  readOnly?: boolean;
}

/**
 * TimeInput Component
 *
 * A custom input field for handling and formatting time values. Users can input numeric values,
 * which are automatically formatted into "HH:mm" format.
 *
 * @param {TimeInputProps} props - The component properties.
 * @returns {JSX.Element} The rendered TimeInput component.
 */
const TimeInput: React.FC<TimeInputProps> = ({
  value = "",
  setValue,
  disabled = false,
  tooltipContent,
  readOnly = false, 
}) => {
  // State for raw user input and formatted display value
  const [inputValue, setInputValue] = useState<string>(value);
  const [displayValue, setDisplayValue] = useState<string>("00:00");

  /**
   * Converts raw input into a formatted "HH:mm" time string.
   * @param {string} input - The raw input string.
   * @returns {string} - Formatted time in "HH:mm".
   */
  const convertToTimeFormat = (input: string): string => {
    // Remove all non-digit characters
    const sanitizedValue = input.replace(/\D/g, "");

    if (!sanitizedValue) {
      return "00:00";
    }

    const numericValue = parseInt(sanitizedValue, 10);

    // Less than 60 -> Treat as minutes
    if (numericValue <= 59) {
      return `00:${String(numericValue).padStart(2, "0")}`;
    }

    // Between 60 and 99 -> Treat as hours and minutes
    if (numericValue >= 60 && numericValue <= 99) {
      const hours = Math.floor(numericValue / 60);
      const minutes = numericValue % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    }

    // Numeric values over 99 -> Assume HHMM format
    const hours = Math.floor(numericValue / 100);
    const minutes = numericValue % 100;

    // Ensure minutes don't exceed 59
    const formattedMinutes = Math.min(minutes, 59);

    return `${String(hours).padStart(2, "0")}:${String(
      formattedMinutes
    ).padStart(2, "0")}`;
  };

  /**
   * Handles changes to the input field, keeping only numeric values.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setInputValue(value);
  };

  /**
   * Handles blur event, formatting the input value into time format.
   */
  const handleBlur = () => {
    const formattedTime = inputValue
      ? convertToTimeFormat(inputValue)
      : "00:00";
    setInputValue(formattedTime);
    setDisplayValue(formattedTime);

    if (setValue) {
      setValue(formattedTime);
    }
  };

  /**
   * Handles keyboard events, formatting the value on Enter or clearing it on Backspace.
   * @param {React.KeyboardEvent<HTMLInputElement>} e - The keyboard event.
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const formattedTime = convertToTimeFormat(inputValue);
      setInputValue(formattedTime);
      setDisplayValue(formattedTime);

      if (setValue) {
        setValue(formattedTime);
      }
    } else if (e.key === "Backspace") {
      setInputValue("");
    }
  };

  // Synchronize external value changes
  useEffect(() => {
    if (value) {
      const formattedTime = convertToTimeFormat(value);
      setInputValue(formattedTime);
      setDisplayValue(formattedTime);
    }
  }, [value]);

  return (
    <div className={styles.timeInputContainer}>
      {disabled ? (
        <Tooltip title={tooltipContent}>
          <input
            className={`${styles.timeInput} ${disabled ? styles.disabled : ""}`}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            placeholder="00:00"
            disabled={disabled}
          />
        </Tooltip>
      ) : (
        <input
          className={`${styles.timeInput} ${disabled ? styles.disabled : ""}`}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="00:00"
          disabled={disabled}
          readOnly={readOnly}
        />
      )}
    </div>
  );
};

export default TimeInput;
