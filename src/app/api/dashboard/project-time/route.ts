// src/app/project-time/route.ts
import { NextResponse } from "next/server";
import { dataForUser1, dataForUser2 } from "../data/data-sets";

export async function POST(request: Request) {
  try {
    const startDateHeader = request.headers.get("userID");
    const userId = startDateHeader ? parseInt(startDateHeader) : 1;


    const data = userId === 1 ? dataForUser1 : dataForUser2;

    return NextResponse.json({
      projectTimeChart: data.projectTimeChart,
    });
  } catch (error) {
    console.error("Error fetching project time data:", error);
    return NextResponse.json(
      { error: "Failed to fetch project time data" },
      { status: 500 }
    );
  }
}
