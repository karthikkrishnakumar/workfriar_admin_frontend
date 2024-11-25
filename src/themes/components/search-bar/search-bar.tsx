"use client";

import React, { useState } from "react";
import styles from "./search-bar.module.scss";
import IconInputField from "../icon-inputfield/icon-inputfield";
import Icons from "@/themes/images/icons/icons";

interface SearchaBarProps {
  placeholder: string; // Placeholder text for the input field
}

/**
 * A reusable search bar component that allows users to input search queries.
 *
 * @param {SearchaBarProps} props - Props passed to the component.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar: React.FC<SearchaBarProps> = ({ placeholder }) => {
  const [value, setValue] = useState(""); // Tracks the current input value

  return (
    <div className={styles.searchBarWrapper}>
      {/* Input field with an icon, accepting user input */}
      <IconInputField
        iconPosition="left" // Position of the icon within the input field
        icon={Icons.search} // Search icon displayed in the input field
        placeholder={placeholder} // Placeholder text passed as a prop
        value={value} // Current value of the input field
        onChange={setValue} // Updates the value state when input changes
        type="text" // Type of input field (text)
      />
      {/* Placeholder for a clear button (currently empty) */}
      <div className={styles.clearButton}></div>
    </div>
  );
};

export default SearchBar;
