import React, { useState } from "react";
import styles from "./year-selector.module.scss";
import Icons from "@/themes/images/icons/icons";

interface YearSelectorProps {
  onChange: (year: string) => void;
}

const YearSelector: React.FC<YearSelectorProps> = ({ onChange }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  onChange(year.toString());

  const handlePrevYear = () => {
    const newYear = year - 1;
    setYear(newYear);
    onChange(newYear.toString());
  };

  const handleNextYear = () => {
    const newYear = year + 1;
    setYear(newYear);
    onChange(newYear.toString());
  };

  return (
    <div className={styles.yearSelector}>
      <button
        className={`${styles.arrowButton} ${styles.leftArrowButton}`}
        onClick={handlePrevYear}
        aria-label="Previous Year"
      >
        {Icons.arrowRightDark} {/* Use the left arrow icon */}
      </button>
      <span className={styles.year}>{year}</span>
      <button
        className={styles.arrowButton}
        onClick={handleNextYear}
        aria-label="Next Year"
      >
        {Icons.arrowRightDark}
      </button>
    </div>
  );
};

export default YearSelector;
