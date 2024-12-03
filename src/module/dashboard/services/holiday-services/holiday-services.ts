import http from "@/utils/http";

// Define the interface for holiday data
export interface HolidayProps {
  holidayName: string;
  holidayDate: string;
}

/**
 * Fetches the holiday data from the API.
 *
 * @returns A promise containing the holiday data.
 */
export const HolidayServices = async (): Promise<HolidayProps[]> => {
  try {
    // Make an HTTP POST request to fetch the holiday data
    const response = await http().post("/api/dashboard/holidays", {});
    return response.response.data.holidayData; // Return the holiday data
  } catch (error) {
    console.error("Error fetching holiday data:", error);
    throw error; // Rethrow the error if something goes wrong
  }
};
