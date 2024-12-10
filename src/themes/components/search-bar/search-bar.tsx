"use client";

import React from "react";
import styles from "./search-bar.module.scss";
import IconInputField from "../icon-inputfield/icon-inputfield";
import Icons from "@/themes/images/icons/icons";

interface SearchBarProps {
  placeholder: string; // Placeholder text for the input field
  value: string; // Current value of the search input
  onChange: (value: string) => void; // Handler for value changes
}

/**
 * A reusable search bar component that allows users to input search queries.
 *
 * @param {SearchBarProps} props - Props passed to the component.
 * @returns {JSX.Element} The rendered SearchBar component.
 */
const SearchBar: React.FC<SearchBarProps> = ({ placeholder, value, onChange }) => {
  return (
    <div className={styles.searchBarWrapper}>
      {/* Input field with an icon, accepting user input */}
      <IconInputField
        iconPosition="left" // Position of the icon within the input field
        icon={Icons.search} // Search icon displayed in the input field
        placeholder={placeholder} // Placeholder text passed as a prop
        value={value} // Current value of the input field
        onChange={onChange} // Pass the onChange handler to IconInputField
        type="text" // Input type
      />
      {/* Placeholder for a clear button */}
      <div className={styles.clearButton}></div>
    </div>
  );
};

export default SearchBar;
