"use client";
import React, { useState } from "react";
import styles from "./time-input.module.scss";

interface TimeInputProps {
    value:string;
    setValue?:(value:string)=>void;
    disabled:boolean;
}
const TimeInput:React.FC<TimeInputProps> = ({value,setValue,disabled}) => {
  const [inputValue, setInputValue] = useState<string>(value); 
  const [displayValue, setDisplayValue] = useState<string>("00:00");

  // Function to convert input to formatted time
  const convertToTimeFormat = (value: string): string => {
    // Remove any non-numeric characters except dot
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    
    // Parse the numeric value
    const numericValue = parseFloat(sanitizedValue);
    
    // Validate input range
    if (isNaN(numericValue) || numericValue > 12) {
      return displayValue;
    }

    // Calculate hours and minutes
    const hours = Math.floor(numericValue);
    const minutes = Math.round(((numericValue % 1) * 60));
    
    // Format the time
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Remove any non-numeric characters except dot
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    setInputValue(sanitizedValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Ensure backspace works for clearing input
    if (e.key === "Backspace") {
      if (inputValue.length === 0) {
        // If input is already empty, reset display
        setDisplayValue("00:00");
      }
      // Allow default backspace behavior
      return;
    }

    // Convert on Enter key
    if (e.key === "Enter") {
      const formattedTime = convertToTimeFormat(inputValue);
      setInputValue(formattedTime);
      setDisplayValue(formattedTime);
    }
  };

  const handleBlur = () => {
    // Convert on blur if there's a value
    if (inputValue !== "") {
      const formattedTime = convertToTimeFormat(inputValue);
      setInputValue(formattedTime);
      setDisplayValue(formattedTime);
    } else {
      // Reset to default if input is empty
      setInputValue("");
      setDisplayValue("00:00");
    }
  };

  return (
    <div className={styles.timeInputContainer}>
      <input
        className={styles.timeInput}
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