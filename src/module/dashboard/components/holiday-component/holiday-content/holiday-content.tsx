"use client";

import React, { useState } from "react";
import styles from "./holiday-content.module.scss";
import Icons from "@/themes/images/icons/icons";
import { Empty } from "antd";
import { Holidays } from "@/interfaces/dashboard/dashboard";

interface HolidayProps {
  holidays:Holidays[] | [];
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

  const isEmptyData = !holidays || holidays.length === 0

  return (
    <>
    {isEmptyData ? (
      // Render empty illustration when no data is available
      <div className={styles.emptyWrapper}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No Holidays Available"
        />
      </div>
    ) : (
    <div className={styles.holidayCard}>
      <button onClick={handlePrev} className={styles.arrowButton}>
        {Icons.arrowLeftGrey}
      </button>
      <div className={styles.holidaysDetialsDiv}>
        <p className={styles.holidayTitle}>{currentHoliday?.holiday_name}</p>
        <p className={styles.holidayDate}>{currentHoliday?.holiday_date}</p>
      </div>
      <button onClick={handleNext} className={styles.arrowButton}>
        {Icons.arrowRightGrey}
      </button>
    </div>
    )}
    </>
  );
};

export default DashboardHoliday;
