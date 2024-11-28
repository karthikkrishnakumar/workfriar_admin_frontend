"use client"
import React, { useEffect, useState } from "react";
import styles from "./notification-card.module.scss"; // Adjust the path as needed
import CardSection from "../../card-section/card-section";
import DashboardNotifications from "../notifications/dashboard-notifications";
import { Notification, NotificationService } from "@/module/dashboard/services/notifications-services/notifications-services";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

const NotificationCard: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch notifications when the component mounts
    const fetchNotifications = async () => {
      try {
        const fetchedNotifications = await NotificationService.fetchNotifications(); // Pass the userID
        setNotifications(fetchedNotifications);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to load notifications.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <CardSection
      title="Notifications"
      centerContent={
        !isLoading ? (
          <SkeletonLoader count={2} avatar={true} paragraph={{ rows: 2 }} className={styles.customSkeleton }/>
        ) : error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <DashboardNotifications notifications={notifications} />
        )
      }
      className={styles.notificationCard}
    />
  );
};

export default NotificationCard;
