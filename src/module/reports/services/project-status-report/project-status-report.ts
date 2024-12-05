import http from "@/utils/http";

// Fetch project status report data
export const fetchProjectStatusReport = async () => {
  try {
    const response = await http().post("/api/reports/project-status-report");
    console.log(response.response.data)
    return response.response.data; // Assuming the API returns a JSON object with project data
  } catch (error) {
    console.error("Error fetching project status report:", error);
    throw error;
  }
};
