import http from "@/utils/http";

export const fetchProjectDetails = async (id: string) => {
    try {
    const params: Record<string, any> = {};

    params.id = id;

    const response = await http().post("/api/reports/project-report-details",
        params
    );
    console.log(response.response.data)
    return response.response.data.report_details; // Assuming the API returns a JSON object with project data
  } catch (error) {
    console.error("Error fetching project status report:", error);
    throw error;
  }
};
