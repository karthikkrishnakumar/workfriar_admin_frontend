import http from "@/utils/http";

export const fetchTimeSheetReportData = async (tabKey: string) => {
    try {
      // Send the tabKey in the request body
      const response = await http().post("/api/reports/time-sheet-reports", {
        tabKey: tabKey, // Correctly pass the tabKey
      });
  
      console.log(response.response.data);
      return response.response.data.timesheet_report_details; // Assuming the API returns the filtered data
    } catch (error) {
      console.error("Error fetching time sheet report:", error);
      throw error;
    }
  };