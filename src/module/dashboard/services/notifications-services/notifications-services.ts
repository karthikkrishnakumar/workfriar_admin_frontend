import http from "@/utils/http";

// Define the interface for a notification object
export interface Notification {
  id: string; // Unique identifier for the notification
  message: string; // The content of the notification
  time: string; // Timestamp of when the notification was sent
  origin: string; // Source of the notification
}

/**
 * Fetches a list of notifications for a user.
 *
 * @returns A promise containing the list of notifications.
 */
export const NotificationServices = async (): Promise<Notification[]> => {
  try {
    // Make an HTTP POST request to fetch notifications
    const response = await http().post(`/api/dashboard/notifications`, {});
    return response.response.data.notifications; // Return the notifications array
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error; // Rethrow the error if something goes wrong
  }
};
