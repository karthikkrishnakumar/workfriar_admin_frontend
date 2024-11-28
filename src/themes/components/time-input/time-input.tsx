"use client";
import React, { useState, useEffect } from "react";
import styles from "./time-input.module.scss";

interface TimeInputProps {
  value?: string;
  setValue?: (value: string) => void;
  disabled?: boolean;
}

const TimeInput: React.FC<TimeInputProps> = ({
  value = "",
  setValue,
  disabled = false,
}) => {
  const [inputValue, setInputValue] = useState<string>(value);
  const [displayValue, setDisplayValue] = useState<string>("00:00");

  // Function to convert input to formatted time
  const convertToTimeFormat = (input: string): string => {
    const sanitizedValue = input.replace(/\D/g, "");

    if (sanitizedValue === "") return "00:00";

    const numericValue = parseInt(sanitizedValue, 10);

    if (numericValue <= 59) {
      return `00:${String(numericValue).padStart(2, "0")}`;
    } else if (numericValue >= 60 && numericValue <= 99) {
      const hours = Math.floor(numericValue / 60);
      const minutes = numericValue % 60;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}`;
    } else {
      const hours = Math.floor(numericValue / 100);
      const minutes = numericValue % 100;

      const formattedMinutes = Math.min(minutes, 59);

      return `${String(hours).padStart(2, "0")}:${String(
        formattedMinutes
      ).padStart(2, "0")}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setInputValue(value);
  };

  const handleBlur = () => {
    if (inputValue !== "") {
      const formattedTime = convertToTimeFormat(inputValue);
      setInputValue(formattedTime);
      setDisplayValue(formattedTime);

      if (setValue) {
        setValue(formattedTime);
      }
    } else {
      setInputValue("");
      setDisplayValue("00:00");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const formattedTime = convertToTimeFormat(inputValue);
      setInputValue(formattedTime);
      setDisplayValue(formattedTime);

      if (setValue) {
        setValue(formattedTime);
      }
    }else if(e.key === "Backspace"){
      setInputValue('')
    }
  };

  useEffect(() => {
    if (value) {
      const formattedTime = convertToTimeFormat(value);
      setInputValue(formattedTime);
      setDisplayValue(formattedTime);
    }
  }, [value]);

  return (
    <div className={styles.timeInputContainer}>
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
    </div>
  );
};

export default TimeInput;
