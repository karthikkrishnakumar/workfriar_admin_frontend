import { ReactNode } from "react";

export interface TimeEntry {
    date: string;
    isHoliday: boolean;
    hours: string;
}

export interface TimesheetDataTable {
    timesheetId?: string;
    projectName: string;
    categoryName: string;
    taskDetail: string;
    dataSheet: TimeEntry[];
    status: string;
}

async function fetchTimesheets(setTimeSheetData: (data: TimesheetDataTable[]) => void, startDate?: string, endDate?: string): Promise<void> {
    const response = {
        success: true,
        message: "Weekly timesheets fetched successfully",
        length: 3,
        data: [
            {
                timesheetId: "6748098aa081d9c94604c49e",
                projectName: "Soeazy",
                categoryName: "UI/UX",
                taskDetail: "Worked on front-end feature X.",
                dataSheet: [
                    { date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "08:00", _id: "67480a06892b9268a9637400" },
                    { date: "2024-12-05T00:00:00.000Z", isHoliday: false, hours: "07:30", _id: "67480a06892b9268a9637401" },
                    { date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "06:00", _id: "67480a06892b9268a9637402" },
                    { date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "05:00", _id: "67480a06892b9268a9637403" },
                    { date: "2024-12-08T00:00:00.000Z", isHoliday: true, hours: "00:00", _id: "67480a06892b9268a9637404" },
                    { date: "2024-12-09T00:00:00.000Z", isHoliday: false, hours: "08:00", _id: "67480a06892b9268a9637405" },
                    { date: "2024-12-10T00:00:00.000Z", isHoliday: false, hours: "07:00", _id: "67480a06892b9268a9637406" }
                ],
                status: "pending"
            },
            {
                timesheetId: "67480d06892b9268a963743b",
                projectName: "Soeazy",
                categoryName: "Bug Fixing",
                taskDetail: "Resolved backend API issues.",
                dataSheet: [
                    { date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "06:00", _id: "67480e02892b9268a9637400" },
                    { date: "2024-12-05T00:00:00.000Z", isHoliday: false, hours: "05:00", _id: "67480e02892b9268a9637401" },
                    { date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "07:30", _id: "67480e02892b9268a9637402" },
                    { date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "04:00", _id: "67480e02892b9268a9637403" },
                    { date: "2024-12-08T00:00:00.000Z", isHoliday: true, hours: "00:00", _id: "67480e02892b9268a9637404" },
                    { date: "2024-12-09T00:00:00.000Z", isHoliday: false, hours: "08:00", _id: "67480e02892b9268a9637405" },
                    { date: "2024-12-10T00:00:00.000Z", isHoliday: false, hours: "07:00", _id: "67480e02892b9268a9637406" }
                ],
                status: "approved"
            },
            {
                timesheetId: "67481a06892b9268a963745c",
                projectName: "NewProject",
                categoryName: "Research",
                taskDetail: "Conducted market analysis.",
                dataSheet: [
                    { date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "05:00", _id: "67481b02892b9268a9637400" },
                    { date: "2024-12-05T00:00:00.000Z", isHoliday: false, hours: "06:00", _id: "67481b02892b9268a9637401" },
                    { date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "05:30", _id: "67481b02892b9268a9637402" },
                    { date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "04:00", _id: "67481b02892b9268a9637403" },
                    { date: "2024-12-08T00:00:00.000Z", isHoliday: true, hours: "00:00", _id: "67481b02892b9268a9637404" },
                    { date: "2024-12-09T00:00:00.000Z", isHoliday: false, hours: "08:00", _id: "67481b02892b9268a9637405" },
                    { date: "2024-12-10T00:00:00.000Z", isHoliday: false, hours: "06:00", _id: "67481b02892b9268a9637406" }
                ],
                status: "rejected"
            }
        ]
    };
    

    setTimeSheetData(response.data)

}

export { fetchTimesheets };