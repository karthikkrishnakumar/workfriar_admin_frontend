"use client"
import React, { useEffect, useState } from "react";
import styles from "./timesheet-chart-card.module.scss";
import CardSection from "../../card-section/card-section";
import { StatusGauge } from "../timesheet-snap-shot-chart/snap-shot-chart";
import {
  fetchTimesheetChartData,
  StatsProps,
} from "@/module/dashboard/services/timesheet-chart-services/timesheet-chart-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import TimeSheetSnapshotFilter from "../../filter-modal/timesheet-snapshot-filter/timesheet-snapshot-filter";

const TimesheetSnapshotChartCard: React.FC = () => {
  const [stats, setStats] = useState<StatsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

  // Function to fetch data
  const fetchData = async (year?: number, month?: number) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedStats = await await fetchTimesheetChartData(year, month);
      setStats(fetchedStats);
    } catch (err) {
      console.error("Error fetching timesheet stats:", err);
      setError("Failed to load timesheet data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch without filters
    fetchData();
  }, []);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Reset month when year changes
    fetchData(year); // Re-fetch data with the selected year
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    if (selectedYear !== null) {
      fetchData(selectedYear, month); // Re-fetch data with the selected year and month
    }
  };

  const handleClickFilter = () => {
    setIsModalVisible(true); // Open the modal when the filter button is clicked
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal when required
  };

  return (
    <>
      <CardSection
        title="Timesheet Snapshot"
        topRightContent={
          loading ? (
            <SkeletonLoader count={1} button={true} />
          ) : (
            <ButtonComponent
              filter={true}
              theme="filter"
              onClick={handleClickFilter}
            />
          )
        }
        centerContent={
          <div className={styles.donutChart}>
            <div className={styles.donut}></div>
          </div>
        }
        bottomContent={
          loading ? (
            <SkeletonLoader
              count={1}
              title={true}
              paragraph={{ rows: 5 }}
              className={styles.customSkeleton}
              classNameItem={styles.customSkeletonItem}
            />
          ) : error ? (
            <div className={styles.error}>{error}</div>
          ) : (
            <div className={styles.snapshotDetails}>
              <StatusGauge
                saved={stats?.saved ?? 0}
                approved={stats?.approved ?? 0}
                rejected={stats?.rejected ?? 0}
              />
            </div>
          )
        }
        className={styles.snapshotCard}
      />
      {isModalVisible && (
        <TimeSheetSnapshotFilter
          onClose={handleCloseModal}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
        />
      )}
    </>
  );
};

export default TimesheetSnapshotChartCard;
