import React from "react";
import styles from "./dashboard-notifications.module.scss";
import { Empty} from "antd";
import RadioComponent from "@/themes/components/radio-button/radio-button";
import { Notification } from "@/interfaces/dashboard/dashboard";

interface NotificationProps {
  notifications: Notification[] | [];
}

const DashboardNotifications: React.FC<NotificationProps> = ({
  notifications = [],
}) => {
  const isEmptyData = !notifications || notifications.length === 0;

  return (
    <ul className={styles.notificationList}>
      {isEmptyData ? (
        // Render empty illustration when no data is available
        <div className={styles.emptyWrapper}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No Notifications Available"
          />
        </div>
      ) : (
        <div className={styles.notificationListDiv}>
          {notifications?.map((notification) => (
            <li key={notification.id} className={styles.notificationItem}>
              <div className={styles.radioLabel}>
                <div className={styles.notificationContent}>
                  <div className={styles.notificationMessage}>
                  <RadioComponent
                  checkedValue={notification.id}
                  value={notification.id}
                  className={styles.radioClass}
                />
                    {notification.message.length > 35
                      ? `${notification.message}`
                      : notification.message}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </div>
      )}
    </ul>
  );
};

export default DashboardNotifications;
