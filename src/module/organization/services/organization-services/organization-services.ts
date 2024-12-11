// services/organization-services.ts

import http from "@/utils/http"; // Assuming you have a custom HTTP utility for API calls

// Function to fetch employee data based on selected tab (department)
export const fetchEmployeesData = async (page:number,pageSize:number,tabKey: string) => {
  try {
    // Send the tabKey (representing the department or "all") in the request body
    const response = await http().post("/api/organization/organization-table-data", {
      page:page,
      pageSize:pageSize,
      tabKey: tabKey, // Correctly pass the tabKey
    });

    // Log the response for debugging
    console.log(response.response.data);
    // Return the employee data (or whatever structure your API provides)
    return response.response.data; // Assuming the API returns filtered employee data
  } catch (error) {
    console.error("Error fetching employee data:", error);
    throw error;
  }
};
