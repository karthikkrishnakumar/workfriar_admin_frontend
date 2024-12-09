import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Example dataset
    const projects_status = [
      {
        _id: "1",
        project_name: "Diamond Lease",
        project_lead: "Aswina Vinod",
        actual_start_date: "11/10/2024",
        actual_end_date: "02/05/2025",
        reporting_period: "Techfriar Dubai",
        progress: 85,
        comments: "Final review meeting held on November.",
      },
      {
        _id: "2",
        project_name: "Emerald Solutions",
        project_lead: "John Doe",
        actual_start_date: "01/08/2024",
        actual_end_date: "12/12/2024",
        reporting_period: "Tech Solutions UAE",
        progress: 75,
        comments: "Progress is steady; awaiting final client approval.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
      },
      // Add more dummy data as needed
    ];

    // Parse request body to get pagination parameters
    const body = await request.json();
    const page = body.page || 1; // Default to page 1
    const pageSize = body.pageSize || 10; // Default to 10 items per page

    // Calculate the start and end indices for the slice
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Paginate the dataset
    const paginatedProjects = projects_status.slice(startIndex, endIndex);

    // Map to the required response structure
    const response = paginatedProjects.map((report) => ({
      id: report._id,
      project_name: report.project_name,
      project_lead: report.project_lead,
      actual_start_date: report.actual_start_date,
      actual_end_date: report.actual_end_date,
      reporting_period: report.reporting_period,
      progress: report.progress,
      comments: report.comments,
    }));

    console.log(response)

    // Return the paginated response along with total count
    return NextResponse.json({
      projects: response,
      total: projects_status.length, // Total number of items in the dataset
    });
  } catch (error) {
    console.error("Error fetching project status data:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch project status data",
      },
      { status: 500 }
    );
  }
}
