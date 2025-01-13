/**
 * Interface representing a notification item.
 * @param message - The message of the notification
 * @param time - The time of the notification
 */
export interface NotificationItem {
  message: string;
  time: string;
}

/**
 * Interface representing a notification group by date.
 * @param date - The date of the notifications
 * @param items - The list of notifications for the date
 */
export interface NotificationGroup {
  date: string;
  items: NotificationItem[];
}

/**
 * Response structure for fetching notifications.
 * @param success - The status of the request (success or failure)
 * @param message - A message providing more details about the request
 * @param data - List of notifications grouped by date
 */
export interface NotificationResponse {
  success: boolean;
  message: string;
  data?: NotificationGroup[];
}

