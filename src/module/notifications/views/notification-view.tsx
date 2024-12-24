"use client"

import React, { useEffect, useState } from "react";
import { NotificationList } from "../components/notifications/notifications";
import useNotificationService, { NotificationGroup } from "../services/notification-service";
import styles from "./notification-view.module.scss";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";


const NotificationView: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { fetchNotifications } = useNotificationService();

  const notificationData = [
    {
      date: 'Today',
      items: [
        {
          message: 'Your timesheet due pending of last week.',
          time: '12:30 PM'
        },
        {
          message: 'Your time sheet is approved my Maddy.',
          time: '12:30 PM'
        }
      ]
    },
    {
      date: 'Yesterday',
      items: [
        {
          message: 'Your timesheet due pending of last week.',
          time: '12:30 PM'
        },
        {
          message: 'Your time sheet is approved my Maddy.',
          time: '12:30 PM'
        }
      ]
    },
    {
      date: 'Aug 1, 2024',
      items: [
        {
          message: 'Your timesheet due pending of last week.',
          time: '12:30 PM'
        },
        {
          message: 'Your time sheet is approved my Maddy.',
          time: '12:30 PM'
        }
      ]
    }
  ];
  useEffect(() => {
    const loadNotifications = async () => {
      setLoading(true);
      const response = await fetchNotifications();
      if (response.success && response.data) {
        const formattedNotifications = response.data.map((group) => ({
          date: group.date,
          items: group.notifications.map((item) => ({
            message: item.message,
            time: item.time,
          })),
        }));
        setNotifications(formattedNotifications);
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
    ) :  (
      <NotificationList notifications={notifications} />
    )}
    </>
  );
};
export default NotificationView;
