"use client";

import React, { useState } from "react";
import styles from "./holiday-content.module.scss";
import Icons from "@/themes/images/icons/icons";

interface HolidayProps {
  holidays: { holidayName: string; holidayDate: string }[];
}

const DashboardHoliday: React.FC<HolidayProps> = ({ holidays }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next holiday
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % holidays.length);
  };

  // Function to go to the previous holiday
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? holidays.length - 1 : prevIndex - 1
    ); // Loop to the last if at the beginning
  };

  const currentHoliday = holidays[currentIndex];

  return (
    <div className={styles.holidayCard}>
      <button onClick={handlePrev} className={styles.arrowButton}>
        {Icons.arrowLeftGrey}
      </button>
      <div className={styles.holidaysDetialsDiv}>
        <p className={styles.holidayTitle}>{currentHoliday?.holidayName}</p>
        <p className={styles.holidayDate}>{currentHoliday?.holidayDate}</p>
      </div>
      <button onClick={handleNext} className={styles.arrowButton}>
        {Icons.arrowRightGrey}
      </button>
    </div>
  );
};

export default DashboardHoliday;
