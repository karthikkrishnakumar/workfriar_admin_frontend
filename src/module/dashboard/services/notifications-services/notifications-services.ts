import axios from "axios";

/**
 * Interface representing a notification object.
 */
export interface Notification {
  id: string;         // Unique identifier for the notification
  message: string;    // The content of the notification
  time: string;       // Timestamp of when the notification was sent
  origin: string;     // Source of the notification
}

/**
 * Service class for managing notifications.
 */
export class NotificationService {
  /**
   * Fetches a list of notifications for a user.
   * 
   * @returns A promise containing the list of notifications.
   */
  static async fetchNotifications(): Promise<Notification[]> {
    try {
      // Make an HTTP GET request to fetch notifications for the given user
      const response = await axios.get(`/api/dashboard/notifications`, {
        headers: {
          userID: "1", // Pass userID as a custom header
        },
      });
      return response.data.notifications; // Return the notifications array
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }
}