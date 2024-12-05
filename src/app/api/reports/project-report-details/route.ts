import { NextResponse } from "next/server";

// Mock project status data
const report_details = [
    {
        _id: "1",
        project_name: "Diamond Lease",
        project_lead: "Aswina Vinod",
        planned_start_date: "01/01/2024",
        planned_end_date: "01/06/2024",
        actual_start_date: "11/10/2024",
        actual_end_date: "02/05/2025",
        reporting_period: "Techfriar Dubai",
        progress: 85,
        comments: "Final review meeting held on November.",
        accomplishments: "Milestone X achieved.",
        goals: "Finalize deployment.",
        blockers: "Resource shortage.",
      },
      {
        _id: "2",
        project_name: "Emerald Solutions",
        project_lead: "John Doe",
        planned_start_date: "02/01/2024",
        planned_end_date: "05/01/2024",
        actual_start_date: "01/08/2024",
        actual_end_date: "12/12/2024",
        reporting_period: "Tech Solutions UAE",
        progress: 75,
        comments: "Progress is steady; awaiting final client approval.",
        accomplishments: "Prototype delivered.",
        goals: "Integrate client feedback.",
        blockers: "Pending hardware delivery.",
      },
      {
        _id: "3",
        project_name: "Ruby Innovations",
        project_lead: "Jane Smith",
        planned_start_date: "03/01/2024",
        planned_end_date: "06/01/2024",
        actual_start_date: "03/01/2024",
        actual_end_date: "09/15/2024",
        reporting_period: "Innovate Qatar",
        progress: 95,
        comments: "All deliverables have been completed successfully.",
        accomplishments: "Completed all milestones.",
        goals: "Prepare final documentation.",
        blockers: "None.",
      },
      {
        _id: "4",
        project_name: "Topaz Tech",
        project_lead: "Alice Johnson",
        planned_start_date: "04/15/2024",
        planned_end_date: "07/15/2024",
        actual_start_date: "04/20/2024",
        actual_end_date: "08/01/2024",
        reporting_period: "TechStart India",
        progress: 60,
        comments: "Team restructuring in progress.",
        accomplishments: "First phase testing completed.",
        goals: "Complete second phase testing.",
        blockers: "Staff shortage.",
      },
      {
        _id: "5",
        project_name: "Sapphire Ventures",
        project_lead: "Michael Brown",
        planned_start_date: "05/10/2024",
        planned_end_date: "10/10/2024",
        actual_start_date: "05/15/2024",
        actual_end_date: "11/15/2024",
        reporting_period: "Global Tech USA",
        progress: 45,
        comments: "Budget constraints causing delays.",
        accomplishments: "Core module development completed.",
        goals: "Secure additional funding.",
        blockers: "Budget constraints.",
      },
];

export async function POST(request:Request) {
  try {
    const { id } = await request.json();

    // Find project by ID
    const project = report_details.find((proj) => proj._id === id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ report_details: project });
  } catch (error) {
    console.error("Error fetching project details:", error);
    return NextResponse.json(
      { error: "Failed to fetch project status data" },
      { status: 500 }
    );
  }
}
