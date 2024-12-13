import { NextResponse } from "next/server";

// Sample employee dataset with additional fields like phone, location, etc.
const employees = [
  {
    _id: 1,
    name: "Guruvayura Gupta",
    email: "guru@gmail.com",
    location: "New York",
    phone: "123-456-7890",
    reportingManager: "Maddy",
    employeeRole: "Project Manager",
    department: "Management",
    status: "Active",
  },
  {
    _id: 2,
    name: "Aswina Vinod",
    email: "aswina@gmail.com",
    location: "California",
    phone: "987-654-3210",
    reportingManager: "Maddy",
    employeeRole: "Product Manager",
    department: "Operations",
    status: "Inactive",
  },
  {
    _id: 3,
    name: "Vishnu M S",
    email: "vishnu@gmail.com",
    location: "Florida",
    phone: "654-321-9870",
    reportingManager: "Aswina Vinod",
    employeeRole: "UX Specialist",
    department: "Finance",
    status: "Inactive",
  },
  {
    _id: 4,
    name: "Elsa Sara Batra",
    email: "elsa@gmail.com",
    location: "Texas",
    phone: "321-987-6540",
    reportingManager: "Maddy",
    employeeRole: "HR Manager",
    department: "HR",
    status: "Inactive",
  },
  {
    _id: 5,
    name: "Sharafudheen K",
    email: "sharaf@gmail.com",
    location: "Ohio",
    phone: "456-789-1230",
    reportingManager: "Aswina Vinod",
    employeeRole: "Software Developer",
    department: "Technical",
    status: "Inactive",
  },
];

export async function POST(request: Request) {
  try {
    // Parse the request body to get the employeeId
    const body = await request.json();
    const { employeeId } = body;

    if (!employeeId) {
      return NextResponse.json(
        {
          error: "Employee ID is required",
        },
        { status: 400 }
      );
    }

    // Find the employee by employeeId
    const employee = employees.find((emp) => emp._id === Number(employeeId));

    if (!employee) {
      return NextResponse.json(
        {
          error: "Employee not found",
        },
        { status: 404 }
      );
    }

    // Map employee data to the response structure
    const response = {
      employeeId: employee._id,
      name: employee.name,
      email: employee.email,
      location: employee.location,
      phone: employee.phone,
      reportingManager: employee.reportingManager,
      employeeRole: employee.employeeRole,
      department: employee.department,
      status: employee.status,
    };


    console.log(response)
    // Return the employee data
    return NextResponse.json({
      status: true,
      data: response,
      message: "Employee Details fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return NextResponse.json(
      {
        status: false,
        error: "Failed to fetch employee data",
        message: "Employee Details fetched unsuccessfully.",
      },
      { status: 500 }
    );
  }
}
