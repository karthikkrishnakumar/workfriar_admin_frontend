import React from "react";
import styles from "./dashboard-notifications.module.scss";
import { Empty} from "antd";
import RadioComponent from "@/themes/components/radio-button/radio-button";
import { Notification } from "@/interfaces/dashboard/dashboard";
import SkeletonLoader from "@/themes/components/skeleton-loader/skeleton-loader";

interface NotificationProps {
  notifications: Notification[] | [];
  loading:boolean;
}

const DashboardNotifications: React.FC<NotificationProps> = ({
  notifications = [],
  loading
}) => {
  const isEmptyData = !notifications || notifications.length === 0;

  if(loading){
    return (
    <div className={styles.skeleton}>
     <SkeletonLoader count={3} paragraph={{ rows: 1 }} className={styles.classLoading}/>
    </div>
    );
    
  }

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
