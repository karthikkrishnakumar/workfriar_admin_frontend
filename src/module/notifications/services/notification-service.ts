import { NotificationResponse } from "@/interfaces/notifications/notification";
import http from "@/utils/http";



/**
 * Service for managing notifications in the system.
 * Contains methods for listing all notifications.
 */
const useNotificationService = () => {
  const apiUrl = "/api/user";

  /**
   * Service to fetch all notifications.
   * @returns A promise resolving to the list of notifications or an error message
   */
  const fetchNotifications = async (): Promise<NotificationResponse> => {
    try {
      const { body } = await http().post(`${apiUrl}/all-notifications`);


      const NotificationResponse: NotificationResponse = {
        success: body.status,
        message: body.message,
        data: body.data?.map((group: any) => ({
          date: group.date, 
          items: group.notifications.map((item: any) => ({
            message: item.message,
            time: item.time, 
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
