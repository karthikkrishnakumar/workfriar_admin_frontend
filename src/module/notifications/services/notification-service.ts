import http from "@/utils/http";

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
  data?: {
    date: string;
    notifications: {
      message: string;
      time: string;
    }[];
  }[];
}

/**
 * Service for managing notifications in the system.
 * Contains methods for listing all notifications.
 */
const useNotificationService = () => {
  const apiUrl = "/user";

  /**
   * Service to fetch all notifications.
   * @returns A promise resolving to the list of notifications or an error message
   */
  const fetchNotifications = async (): Promise<NotificationResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/all-notifications`);
      const NotificationResponse: NotificationResponse = {
        success: body.success,
        message: body.message,
        data: body.data?.map((group: any) => ({
          date: group.date,
          notifications: group.notifications.map((item: any) => ({
            message: item,
            time: new Date().toLocaleTimeString(), // Mock time for now
          })),
        })),
      };
      return NotificationResponse;
    } catch (error) {
      return {
        success: false,
        message: "Failed to fetch notifications. Please try again.",
      };
    }
  };

  return { fetchNotifications };
};

export default useNotificationService;
