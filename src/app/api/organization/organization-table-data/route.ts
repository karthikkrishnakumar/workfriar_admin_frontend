import { NextResponse } from "next/server";

// Sample employee dataset
const employees = [
  {
    _id: 1,
    name: "Guruvayura Gupta",
    email: "guru@gmail.com",
    department: "Management",
    role: "Project Manager",
    reportingManager: "Maddy",
    status: "Active",
  },
  {
    _id: 2,
    name: "Aswina Vinod",
    email: "aswina@gmail.com",
    department: "Operations",
    role: "Product Manager",
    reportingManager: "Maddy",
    status: "In Active",
  },
  {
    _id: 3,
    name: "Vishnu M S",
    email: "vishnu@gmail.com",
    department: "Finance",
    role: "UX Specialist",
    reportingManager: "Aswina Vinod",
    status: "In Active",
  },
  {
    _id: 4,
    name: "Elsa Sara Batra",
    email: "elsa@gmail.com",
    department: "HR",
    role: "HR Manager",
    reportingManager: "Maddy",
    status: "In Active",
  },
  {
    _id: 5,
    name: "Sharafudheen K",
    email: "sharaf@gmail.com",
    department: "Technical",
    role: "Software Developer",
    reportingManager: "Aswina Vinod",
    status: "In Active",
  },
];

export async function POST(request: Request) {
  try {
    // Parse request body to get filter parameters
    const { page, pageSize, tabKey = "all" } = await request.json();

    // Determine the active tab (department)
    const activeTab = tabKey;

    // Calculate the start and end indices for pagination
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Filter employees based on the department (activeTab)
    let filteredEmployees = employees;
    if (activeTab !== "all") {
      filteredEmployees = employees.filter(
        (employee) => employee.department.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Paginate the filtered employees
    const paginatedData = filteredEmployees.slice(startIndex, endIndex);

    // Map the data to the required response structure
    const response = paginatedData.map((employee) => ({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      department: employee.department,
      role: employee.role,
      reportingManager: employee.reportingManager,
      status: employee.status,
    }));

    // Return the filtered and paginated employee data
    return NextResponse.json({
      status: true,
      data: response,
      total: filteredEmployees.length||1, // Total count of filtered employees
      message: "Employee data fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to fetch employee data. Please try again.",
        error: "Unknown error",
      },
      { status: 500 }
    );
  }
}
