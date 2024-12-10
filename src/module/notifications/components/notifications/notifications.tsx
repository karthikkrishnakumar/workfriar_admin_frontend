import React from 'react';
import styles from './notifications.module.scss';

interface NotificationGroupProps {
  title: string;
  children: React.ReactNode;
}

const NotificationGroup: React.FC<NotificationGroupProps> = ({ title, children }) => (
  <div className={styles.notificationGroup}>
    <div className={styles.dateSeparator}>
      <span className={styles.groupTitle}>{title}</span>
    </div>
    <div className={styles.notifications}>
      {children}
    </div>
  </div>
);

interface NotificationItemProps {
  message: string;
  time: string;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ message, time }) => (
  <div className={styles.notificationItem}>
    <div className={styles.bulletContainer}>
      <div className={styles.bullet}>•</div>
    </div>
    <div className={styles.content}>
      <div className={styles.message}>{message}</div>
      <div className={styles.time}>{time}</div>
    </div>
  </div>
);

interface NotificationListProps {
  notifications: {
    date: string;
    items: {
      message: string;
      time: string;
    }[];
  }[];
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications }) => (
  <div className={styles.notificationList}>
    {notifications.map((group, index) => (
      <NotificationGroup key={index} title={group.date}>
        {group.items.map((item, itemIndex) => (
          <NotificationItem
            key={itemIndex}
            message={item.message}
            time={item.time}
          />
        ))}
      </NotificationGroup>
    ))}
  </div>
);

export { NotificationList };