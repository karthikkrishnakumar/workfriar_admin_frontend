import { DatePickerData } from "@/module/dashboard/services/timesheet-due-services/timesheet-due-services";
import { dateStringToMonthDate } from "@/utils/date-formatter-util/date-formatter";
import http from "@/utils/http";

export interface TimeEntry {
    weekday: string;
    date: string;
    isHoliday: boolean;
    hours: string;
    isDisabled:boolean;
    formattedDate?:string;
}

export interface TimesheetDataTable {
    timesheetId?: string;
    projectName: string;
    categoryName: string;
    taskDetail: string;
    dataSheet: TimeEntry[];
    status: string;
}

export interface WeekDaysData {
    name: string;
    date: string;
    isHoliday: boolean;
    formattedDate?:string;
    isDisabled:boolean;
}

async function fetchTimesheets(
    setTimeSheetData: (data: TimesheetDataTable[]) => void,
    setDates: (dateArray: WeekDaysData[]) => void,
    startDate?: string,
    endDate?: string
): Promise<void> {
    try {
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
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "08:00", isDisabled: false},
                        { weekday: "Mon", date: "2024-12-02T00:00:00.000Z", isHoliday: false, hours: "07:30", isDisabled: false },
                        { weekday: "Tue", date: "2024-12-03T00:00:00.000Z", isHoliday: false, hours: "06:00", isDisabled: false },
                        { weekday: "Wed", date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "05:00", isDisabled: false },
                        { weekday: "Thu", date: "2024-12-05T00:00:00.000Z", isHoliday: true, hours: "00:00", isDisabled: false },
                        { weekday: "Fri", date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true },
                        { weekday: "Sat", date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true }
                    ],
                    status: "pending"
                },
                {
                    timesheetId: "67480d06892b9268a963743b",
                    projectName: "Soeazy",
                    categoryName: "Bug Fixing",
                    taskDetail: "Resolved backend API issues.",
                    dataSheet: [
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "06:00", isDisabled: false },
                        { weekday: "Mon", date: "2024-12-02T00:00:00.000Z", isHoliday: false, hours: "05:00", isDisabled: false },
                        { weekday: "Tue", date: "2024-12-03T00:00:00.000Z", isHoliday: false, hours: "07:30", isDisabled: false },
                        { weekday: "Wed", date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "04:00", isDisabled: false },
                        { weekday: "Thu", date: "2024-12-05T00:00:00.000Z", isHoliday: true, hours: "00:00", isDisabled: false },
                        { weekday: "Fri", date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true },
                        { weekday: "Sat", date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true }
                    ],
                    status: "approved"
                },
                {
                    timesheetId: "67481a06892b9268a963745c",
                    projectName: "NewProject",
                    categoryName: "Research",
                    taskDetail: "Conducted market analysis.",
                    dataSheet: [
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "05:00", isDisabled: false },
                        { weekday: "Mon", date: "2024-12-02T00:00:00.000Z", isHoliday: false, hours: "06:00", isDisabled: false },
                        { weekday: "Tue", date: "2024-12-03T00:00:00.000Z", isHoliday: false, hours: "05:30", isDisabled: false },
                        { weekday: "Wed", date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "04:00", isDisabled: false },
                        { weekday: "Thu", date: "2024-12-05T00:00:00.000Z", isHoliday: true, hours: "00:00", isDisabled: false },
                        { weekday: "Fri", date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true },
                        { weekday: "Sat", date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true }
                    ],
                    status: "rejected"
                }
            ]
        };

        // Set timesheet data
        setTimeSheetData(response.data);

        // Extract unique dates
        const getUniqueDates = () => {
            const allDates: WeekDaysData[] = response.data.flatMap(timesheet =>
                timesheet.dataSheet.map(entry => ({
                    name: entry.weekday,
                    date: entry.date,
                    isHoliday: entry.isHoliday,
                    isDisabled:entry.isDisabled,
                    formattedDate: dateStringToMonthDate(entry.date)
                }))
            );

            // Use a Map to remove duplicate dates
            const uniqueDatesMap = new Map<string, WeekDaysData>();
            allDates.forEach(dateObj => {
                if (!uniqueDatesMap.has(dateObj.date)) {
                    uniqueDatesMap.set(dateObj.date, dateObj);
                }
            });

            return Array.from(uniqueDatesMap.values());
        };

        const uniqueDates = getUniqueDates();
        setDates(uniqueDates);
    } catch (error) {
        console.error("Error fetching timesheet data:", error);
    }
}


// function to fetch date
const fetchDateData = async (): Promise<DatePickerData[]> => {
    try {
        const response = await http().post("/api/dashboard/datepicker-data");
        return response.response.data.DatePickerData;
    } catch (error) {
        console.error("Error fetching date picker data:", error);
        throw new Error("Failed to fetch date picker data");
    }
};

export { fetchTimesheets, fetchDateData };
