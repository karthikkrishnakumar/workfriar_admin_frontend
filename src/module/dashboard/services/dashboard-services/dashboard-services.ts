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

export interface Notification {
  id: string;
  message: string;
  time: string;
  origin: string;
}

export interface TimesheetDay {
  date: string;
  hours: string;
  dayOfWeek: string;
}

export interface TimesheetData {
  days: TimesheetDay[];
  total?: string;
}

export interface DashboardData {
  projectTimeChart: ProjectTimeChartType[];
  stats: Stats;
  timesheetData: TimesheetData;
  notifications: Notification[];
}

export class DashboardService {
  static async fetchDashboardData(
    startDate: Date | null,
    endDate: Date | null
  ): Promise<DashboardData> {
    try {
      const response = await axios.get("/api/dashboard/dashboard-api", {
        params: {
          startDate: startDate?.toISOString(),
          endDate: endDate?.toISOString(),
        },
      });

      return response.data;
    } catch (error) {
      console.error("Error fetching project time chart data:", error);
      throw error;
    }
  }
}
