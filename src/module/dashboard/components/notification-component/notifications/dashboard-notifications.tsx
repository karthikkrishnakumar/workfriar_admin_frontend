import React from "react";
import styles from "./dashboard-notifications.module.scss";
import { Notification } from "@/module/dashboard/services/dashboard-services/dashboard-services";

interface NotificationProps {
  notifications: Notification[] | [];
}

const DashboardNotifications: React.FC<NotificationProps> = ({
  notifications = [],
}) => {
  return (
    <ul className={styles.notificationList}>
      {notifications?.map((notification) => (
        <li key={notification.id} className={styles.notificationItem}>
          <div className={styles.radioLabel}>
            <input
              type="radio"
              name="notification"
              className={styles.radioInput}
              id={`notification-${notification.id}`}
            />
            <div className={styles.notificationContent}>
              <div className={styles.notificationMessage}>
                {notification.message.length > 35
                  ? `${notification.message}`
                  : notification.message}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DashboardNotifications;
