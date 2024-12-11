import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

// Function to fetch employee data based on employee ID
export const fetchEmployeeProjectsData = async (page:number,pageSize:number,employeeId: string) => {
  try {
    // Sending the employeeId in the request
    const response = await http().post("/api/organization/employee-projects-details/", {
      page:page,
      pageSize:pageSize,
      employeeId: employeeId,
    });

    // Return the employee data
    return response.response.data;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    throw error;
  }
};
