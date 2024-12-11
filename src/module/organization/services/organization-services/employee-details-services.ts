import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

// Function to fetch employee data based on employee ID
export const fetchEmployeeData = async (employeeId: string) => {
  try {
    // Sending the employeeId in the request
    const response = await http().post("/api/organization/employee-details/", {
      employeeId: employeeId,
    });

    console.log()
    // Return the employee data
    return response.response.data.employee;
  } catch (error) {
    console.error("Error fetching employee data:", error);
    throw error;
  }
};
