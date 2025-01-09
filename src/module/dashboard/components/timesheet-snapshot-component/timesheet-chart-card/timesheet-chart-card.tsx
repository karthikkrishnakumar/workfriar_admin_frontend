"use client";
import React, { useEffect, useState } from "react";
import styles from "./timesheet-chart-card.module.scss";
import CardSection from "../../card-section/card-section";
import { StatusGauge } from "../timesheet-snap-shot-chart/snap-shot-chart";

import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import TimeSheetSnapshotFilter from "../../filter-modal/timesheet-snapshot-filter/timesheet-snapshot-filter";
import Icons from "@/themes/images/icons/icons";
import UseDashboardServices, {
  StatsProps,
} from "@/module/dashboard/services/dashboard-services/dashboard-services";

const TimesheetSnapshotChartCard: React.FC = () => {
  const [statusData, setStatusData] = useState<StatsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<{
    year: number | null;
    month: number | null;
  }>();

  // Function to fetch data
  const fetchData = async (year?: number | null, month?: number | null) => {
    setLoading(true);
    setError(null);
    try {
      const fetchedStats = await UseDashboardServices().fetchTimesheetChartData(
        year,
        month
      );
      setStatusData(fetchedStats?.data || []);
    } catch (err) {
      console.error("Error fetching timesheet stats:", err);
      setError("Failed to load timesheet data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filterData) {
      fetchData(filterData.year, filterData?.month);
    } else {
      fetchData();
    }
  }, [filterData]);

  const handleFilterApply = (filters: any) => {
    setFilterData(filters); // Update filter data
    setIsModalVisible(false); // Close the modal
  };

  const handleClickFilter = () => {
    setIsModalVisible(true); // Open the modal when the filter button is clicked
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close the modal when required
  };

  if (error) return <div>{error}</div>;
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
              content={Icons.filter}
              onClick={handleClickFilter}
              className={styles.filterButton}
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
          ) : (
            <div className={styles.snapshotDetails}>
              <StatusGauge
                statusData={statusData} // Pass the count dynamically
              />
            </div>
          )
        }
        className={styles.snapshotCard}
      />
      {isModalVisible && (
        <TimeSheetSnapshotFilter
          onClose={handleCloseModal}
          onFilterApply={handleFilterApply}
          appliedFilters={filterData}
        />
      )}
    </>
  );
};

export default TimesheetSnapshotChartCard;
