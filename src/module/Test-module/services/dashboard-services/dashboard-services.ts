import axios from "axios";

// Define the interfaces for the data structures
export interface Stats {
  saved: number;
  approved: number;
  rejected: number;
}

export interface ProjectTimeChartType {
  project: string;
  hours: number;
}

export interface DashboardData {
  projectTimeChart: ProjectTimeChartType[];
  stats: Stats;
}

export class DashboardService {
  static async fetchProjectTimeChart(): Promise<DashboardData> {
    try {
      const response = await axios.get("/api/dashboard/dashboard-api");
      return response.data; 
    } catch (error) {
      console.error("Error fetching project time chart data:", error);
      throw error;
    }
  }
}
