// services/holiday-services.ts

import axios from "axios";

// Define the interface for holiday data
export interface HolidayProps {
  holidayName: string;
  holidayDate: string;
}

/**
 * Service class for fetching holiday data.
 */
export class HolidayService {
  /**
   * Fetches the holiday data from the API.
   * @returns A promise containing the holiday data.
   */
  static async fetchHolidayData(): Promise<HolidayProps[]> {
    try {
      // Make an HTTP GET request to fetch the holiday data
      const response = await axios.get("/api/dashboard/holidays", {
        headers: {
          userID: "1", // Pass userID as a custom header
        },
      });
      console.log(response.data.holidayData);
      return response.data.holidayData; // Return the holiday data
    } catch (error) {
      console.error("Error fetching holiday data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }
}
