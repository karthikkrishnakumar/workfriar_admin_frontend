"use client"
import React, { useEffect, useState } from "react";
import styles from "./notification-card.module.scss"; // Adjust the path as needed
import CardSection from "../../card-section/card-section";
import DashboardNotifications from "../notifications/dashboard-notifications";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import ButtonComponent from "@/themes/components/button/button";
import UseDashboardServices from "@/module/dashboard/services/dashboard-services/dashboard-services";
import { useRouter } from "next/navigation";
import { Notification } from "@/interfaces/dashboard/dashboard";

const NotificationCard: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]|[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications= await UseDashboardServices().fetchNotifications(); // Pass the userID
        setNotifications(fetchedNotifications.data);
      } catch (err) {
        setError("Failed to load notifications.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleClickAllnotification = ()=>{
    router.push("/notifications")
  }

  if(error) return <div>{error}</div>

  return (
    <CardSection
      title="Notifications"
      topRightContent={
        isLoading ? (
          <SkeletonLoader count={1} button={true} classNameItem={styles.customSkeletonDatepicker}/>
        ) : (
          <ButtonComponent label="View all" theme="link" link onClick={handleClickAllnotification}/>
        )
      }
      centerContent={
        isLoading ? (
          <SkeletonLoader count={2} paragraph={{ rows: 1 }} className={styles.customSkeleton}/>
        ) : (
          <DashboardNotifications notifications={notifications} />
        )
      }
      className={styles.notificationCard}
    />
  );
};

export default NotificationCard;
