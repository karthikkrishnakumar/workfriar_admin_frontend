// services/project-time-services.ts

import axios from "axios";

// Define the interface for project time chart data
export interface ProjectTimeChartProps {
  project: string;
  hours: number;
}

/**
 * Service class for fetching project time data.
 */
export class ProjectTimeService {
  /**
   * Fetches the project time data for today.
   * @returns A promise containing the project time chart data.
   */
  static async fetchProjectTimeData(): Promise<ProjectTimeChartProps[]> {
    try {
      // Make an HTTP GET request to fetch the project time data
      const response = await axios.get("/api/dashboard/project-time", {
        headers: {
          userID: "1", // Pass userID as a custom header
        },
      });
      return response.data.projectTimeChart; // Return the project time data
    } catch (error) {
      console.error("Error fetching project time data:", error);
      throw error; // Rethrow the error if something goes wrong
    }
  }
}
