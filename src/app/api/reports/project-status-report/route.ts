import { NextResponse } from "next/server";

export async function POST(request:Request) {
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
    ];

    // Extract year and month from the request body

    // Extract user ID from the request headers (e.g., for user-specific filtering)
    const startDateHeader = request.headers.get("userID");
    const userId = startDateHeader ? parseInt(startDateHeader) : 1;

    

    // Map to the required response structure
    const response = projects_status.map((report) => ({
      id: report._id,
      project_name: report.project_name,
      project_lead: report.project_lead,
      actual_start_date: report.actual_start_date,
      actual_end_date: report.actual_end_date,
      reporting_period: report.reporting_period,
      progress: report.progress,
      comments: report.comments,
    }));

    // Return the mapped response
    return NextResponse.json({
      projects: response,
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
