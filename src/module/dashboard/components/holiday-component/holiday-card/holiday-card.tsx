// components/holiday-component/holiday-card/holiday-card.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./holiday-card.module.scss"; // Adjust the path as needed
import CardSection from "../../card-section/card-section";
import DashboardHoliday from "../holiday-content/holiday-content";
import {
  HolidayService,
  HolidayProps,
} from "@/module/dashboard/services/holiday-services/holiday-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

const HolidayCard: React.FC = () => {
  const [holidayData, setHolidayData] = useState<HolidayProps[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch holiday data when the component mounts
  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const data = await HolidayService.fetchHolidayData();
        console.log(data, "in holiday");
        setHolidayData(data);
      } catch (error) {
        setError("Error fetching holiday data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidayData();
  }, []);

  return (
    <CardSection
      title="Holidays"
      centerContent={
        !loading ? (
          <SkeletonLoader count={2} avatar={true} paragraph={{ rows: 2 }} className={styles.customSkeleton} />
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <DashboardHoliday holidays={holidayData ? holidayData : []} />
        )
      }
      className={styles.holidaysCard}
    />
  );
};

export default HolidayCard;
