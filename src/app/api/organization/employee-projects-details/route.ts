import { NextResponse } from "next/server";

interface Project {
  projectName: string;
  client: string;
  startDate: string;
  endDate: string;
  projectLead: string;
  status: string;
}

interface EmployeeProjectsResponse {
  employee_projects: Project[];
}

const employeeProjects = [
  {
    employeeId: "1",
    projects: [
      {
        projectName: "Project A",
        client: "Client 1",
        startDate: "2023-01-01",
        endDate: "2023-06-30",
        projectLead: "John Doe",
        status: "Completed",
      },
      {
        projectName: "Project B",
        client: "Client 2",
        startDate: "2023-07-01",
        endDate: "2023-12-31",
        projectLead: "Jane Smith",
        status: "On Hold",
      },
    ],
  },
  {
    employeeId: "2",
    projects: [
      {
        projectName: "Project C",
        client: "Client 3",
        startDate: "2022-05-01",
        endDate: "2022-12-31",
        projectLead: "Alice Johnson",
        status: "Completed",
      },
      {
        projectName: "Project D",
        client: "Client 4",
        startDate: "2023-03-01",
        endDate: "2023-08-31",
        projectLead: "Bob Brown",
        status: "In Progress",
      },
    ],
  },
  // More employees and projects can be added similarly...
];

export async function POST(request: Request) {
  const { page, pageSize, employeeId } = await request.json();

  try {
    // Calculate the start and end indices for the slice
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Simulate fetching data by filtering based on employeeId
    const employee = employeeProjects.find(
      (emp) => emp.employeeId === employeeId
    );

    // Paginate the dataset
    const paginatedData = employee?.projects.slice(startIndex, endIndex);

    if (!employee) {
      return NextResponse.json(
        { message: "Employee not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: true,
      data: paginatedData,
      total: employee.projects.length,
      message: "Employee Project data fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching employee data:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
