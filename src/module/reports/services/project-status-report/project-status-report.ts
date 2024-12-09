import http from "@/utils/http";

// Fetch project status report data with pagination
export const fetchProjectStatusReport = async (page: number, pageSize: number) => {
  try {
    const response = await http().post("/api/reports/project-status-report", {
      page,
      pageSize,
    });
    return response.response.data; // Assuming the API returns data in the format { projects: [], total: number }
  } catch (error) {
    console.error("Error fetching project status report:", error);
    throw error;
  }
};
