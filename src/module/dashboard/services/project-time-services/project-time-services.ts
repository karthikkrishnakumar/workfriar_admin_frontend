import http from "@/utils/http";

// Define the interface for project time chart data
export interface ProjectTimeChartProps {
  project: string;
  hours: number;
}

/**
 * Fetches the project time data for today.
 * @returns A promise containing the project time chart data.
 */
export const ProjectTimeServices= async (): Promise<ProjectTimeChartProps[]> => {
  try {
    // Make an HTTP POST request to fetch the project time data
    const response = await http().post("/api/dashboard/project-time");
    return response.response.data.projectTimeChart; // Return the project time data
  } catch (error) {
    console.error("Error fetching project time data:", error);
    throw error; // Rethrow the error if something goes wrong
  }
};
