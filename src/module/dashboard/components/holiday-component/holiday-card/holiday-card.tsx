// components/holiday-component/holiday-card/holiday-card.tsx
"use client";
import React, { useEffect, useState } from "react";
import styles from "./holiday-card.module.scss"; // Adjust the path as needed
import CardSection from "../../card-section/card-section";
import DashboardHoliday from "../holiday-content/holiday-content";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import UseDashboardServices from "@/module/dashboard/services/dashboard-services/dashboard-services";
import { useRouter } from "next/navigation";
import { Holidays } from "@/interfaces/dashboard/dashboard";

const HolidayCard: React.FC = () => {
  const [holidayData, setHolidayData] = useState<Holidays[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter()

  // Fetch holiday data when the component mounts
  useEffect(() => {
    const fetchHolidayData = async () => {
      try {
        const data = await UseDashboardServices().fetchHolidays();
        setHolidayData(data.data);
      } catch (error) {
        setError("Error fetching holiday data.");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidayData();
  }, []);

  const handleClickAllHoliday = () => {
    router.push("/holidays")
  };

  return (
    <CardSection
      title="Holidays"
      topRightContent={
        loading ? (
          <SkeletonLoader
            count={1}
            button={true}
            classNameItem={styles.customSkeletonItem}
          />
        ) : (
          <ButtonComponent
            label="View all"
            theme="link"
            link
            onClick={handleClickAllHoliday}
          />
        )
      }
      centerContent={
        loading ? (
          <SkeletonLoader
            count={1}
            button={true}
            paragraph={{ rows: 2 }}
            className={styles.customSkeleton}
            classNameItem={styles.customSkeletonItem}
          />
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
