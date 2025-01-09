"use client";

import React, { useEffect, useState } from "react";
import { NotificationList } from "../components/notifications/notifications";
import useNotificationService, { NotificationGroup } from "../services/notification-service";
import styles from "./notification-view.module.scss";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";
import { Empty, message } from "antd";

const NotificationView: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { fetchNotifications } = useNotificationService();

  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      const response = await fetchNotifications();

      if (response.success && response.data) {
        setNotifications(response.data);
      } else if (!response.success) {
        message.error(response.message || "Failed to fetch notifications.");
      }
      setLoading(false);
    };

    loadNotifications();
  }, []);

  return (
    <>
      {loading ? (
        <SkeletonLoader
          paragraph={{ rows: 15 }}
          classNameItem={styles.customSkeleton}
        />
      ) : notifications.length === 0 ? (
        <div className={styles.emptyContainer}>
          <Empty description="No notifications available" />
        </div>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </>
  );
};

export default NotificationView;
