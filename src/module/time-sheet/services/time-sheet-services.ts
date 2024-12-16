
import { CategoryList, OverViewTable, ProjectList, TimesheetDataTable, WeekDaysData } from "@/interfaces/timesheets/timesheets";
import { dateStringToMonthDate, enGBFormattter, toISODateFormatter } from "@/utils/date-formatter-util/date-formatter";
import http from "@/utils/http";





// delay function to set loading
export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// Usage example
export async function run() {
    await delay(1000); // Wait for 3 seconds
}



// //////////////////////////////////////////////////

async function fetchProjects(setProjects: (projects: ProjectList[]) => void): Promise<void> {
    try {
        const props: JSON = <JSON>(<unknown>{});
        const { body } = await http().post('/api/project/list-projects-by-user');
        console.log(body);
        setProjects(body.data);
    } catch (error) {
        console.error(error);
    }
}

async function fetchTaskCategories(projectId: string | undefined, setTaskCategories: (categories: CategoryList[]) => void): Promise<void> {
    
    try {
        const props: JSON = <JSON>(<unknown>{ projectId })
        const { body } = await http().post('/api/project/get-categories', props)
        console.log(body);
        setTaskCategories(body.data);
    } catch (error) {
        console.error(error);
    }
}

// function to fetch all time sheets
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
                    // timesheetId: "6748098aa081d9c94604c49e",
                    projectName: "Soeazy",
                    project_id:"6759681ed976e0b94dbb8a7d",
                    categoryName: "UI/UX",
                    task_category_id: "6752c1bca3fa773282a0ff53",
                    taskDetail: "Worked on front-end feature X.",
                    dataSheet: [
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "08:00", isDisabled: false },
                        { weekday: "Mon", date: "2024-12-02T00:00:00.000Z", isHoliday: false, hours: "07:30", isDisabled: false },
                        { weekday: "Tue", date: "2024-12-03T00:00:00.000Z", isHoliday: false, hours: "06:00", isDisabled: false },
                        { weekday: "Wed", date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "05:00", isDisabled: false },
                        { weekday: "Thu", date: "2024-12-05T00:00:00.000Z", isHoliday: true, hours: "00:00", isDisabled: false },
                        { weekday: "Fri", date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true },
                        { weekday: "Sat", date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true }
                    ],
                    status: "in_progress"
                },
                {
                    // timesheetId: "67480d06892b9268a963743b",
                    projectName: "Soeazy",
                    project_id:"6759681ed976e0b94dbb8a7d",
                    categoryName: "Bug Fixing",
                    taskDetail: "Resolved backend API issues.",
                    task_category_id: "6752c1bca3fa773282a0ff53",
                    dataSheet: [
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "06:00", isDisabled: false },
                        { weekday: "Mon", date: "2024-12-02T00:00:00.000Z", isHoliday: false, hours: "05:00", isDisabled: false },
                        { weekday: "Tue", date: "2024-12-03T00:00:00.000Z", isHoliday: false, hours: "07:30", isDisabled: false },
                        { weekday: "Wed", date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "04:00", isDisabled: false },
                        { weekday: "Thu", date: "2024-12-05T00:00:00.000Z", isHoliday: true, hours: "00:00", isDisabled: false },
                        { weekday: "Fri", date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true },
                        { weekday: "Sat", date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true }
                    ],
                    status: "in_progress"
                },
                {
                    // timesheetId: "67481a06892b9268a963745c",
                    projectName: "NewProject",
                    project_id:"6759681ed976e0b94dbb8a7d",
                    categoryName: "Research",
                    task_category_id: "6752c1bca3fa773282a0ff53",
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
                    isDisabled: entry.isDisabled,
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


async function saveTimesheets(timesheet: TimesheetDataTable[]): Promise<void> {
    try {
        const timesheets = timesheet.map((task) => {
            return {
                passedDate: task.dataSheet[0].date,
                task_detail:task.taskDetail,
                data_sheet:task.dataSheet,
                ...task
            }
        })

        const props: JSON = <JSON>(<unknown>{ timesheets });

        const {body} = await http().post('/api/timesheet/save-timesheets',props);

        console.log(body);

    } catch (error) {
        console.error("Error saving timesheet:", error);
    }
}




// fetch past due weeks
async function fetchPastDueWeeks(setTable: (table: OverViewTable[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const response = {
            status: true,
            message: "Past Due",
            data: [
                {
                    startDate: "2024-11-20",
                    endDate: "2024-11-27",
                    status: "pastDue",
                    totalHours: 17,
                },
                {
                    startDate: "2024-11-28",
                    endDate: "2024-11-31",
                    status: "pastDue",
                    totalHours: 17,
                    Hours: 4
                },
                {
                    startDate: "2024-12-01",
                    endDate: "2024-12-07",
                    status: "pastDue",
                    totalHours: 17,
                    Hours: 4
                }
            ]
        };

        const tableData: OverViewTable[] = response.data.map(row => ({
            dateRange: `${enGBFormattter(row.startDate)} - ${enGBFormattter(row.endDate)}`,
            loggedHours: row.totalHours?.toString(), // Ensure it's a string if needed
            approvedHours: row.Hours?.toString()   // Ensure it's a string if needed
        }));


        setTable(tableData); // Pass the transformed data to setTable
        await run();
        setLoading(false);
    } catch (error) {
        console.error("Error fetching past due weeks:", error);
    }
}


// fetch past due time sheet according to each week
async function fetchPastDueTimesheets(dateRangeString: string, setTimesheetTable: (table: TimesheetDataTable[]) => void, setDates: (dateArray: WeekDaysData[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const startDateString = dateRangeString.split("-")[0];
        const endDateString = dateRangeString.split("-")[1];

        const startDate = toISODateFormatter(startDateString);
        const endDate = toISODateFormatter(endDateString);

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
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "08:00", isDisabled: false },
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
                    status: "pending"
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
                    status: "pending"
                }
            ]
        };

        // Extract unique dates
        const getUniqueDates = () => {
            const allDates: WeekDaysData[] = response.data.flatMap(timesheet =>
                timesheet.dataSheet.map(entry => ({
                    name: entry.weekday,
                    date: entry.date,
                    isHoliday: entry.isHoliday,
                    isDisabled: entry.isDisabled,
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
        // Set timesheet data
        setTimesheetTable(response.data);

        await run();
        setLoading(false)


    } catch (error) {
        console.error(error)
    }
}



async function fetchApprovedWeeks(setTable: (table: OverViewTable[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const response = {
            status: true,
            message: "Past Due",
            data: [
                {
                    startDate: "2024-11-20",
                    endDate: "2024-11-27",
                    status: "pastDue",
                    totalHours: 17,
                },
                {
                    startDate: "2024-11-28",
                    endDate: "2024-11-31",
                    status: "pastDue",
                    totalHours: 17,
                    Hours: 4
                },
                {
                    startDate: "2024-12-01",
                    endDate: "2024-12-07",
                    status: "pastDue",
                    totalHours: 17,
                    Hours: 4
                }
            ]
        };

        const tableData: OverViewTable[] = response.data.map(row => ({
            dateRange: `${enGBFormattter(row.startDate)} - ${enGBFormattter(row.endDate)}`,
            loggedHours: row.totalHours?.toString(), // Ensure it's a string if needed
            approvedHours: row.Hours?.toString()   // Ensure it's a string if needed
        }));


        setTable(tableData); // Pass the transformed data to setTable
        await run();
        setLoading(false);
    } catch (error) {
        console.error("Error fetching past due weeks:", error);
    }
}


async function fetchApprovedTimesheets(dateRangeString: string, setTimesheetTable: (table: TimesheetDataTable[]) => void, setDates: (dateArray: WeekDaysData[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const startDateString = dateRangeString.split("-")[0];
        const endDateString = dateRangeString.split("-")[1];

        const startDate = toISODateFormatter(startDateString);
        const endDate = toISODateFormatter(endDateString);

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
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "08:00", isDisabled: false },
                        { weekday: "Mon", date: "2024-12-02T00:00:00.000Z", isHoliday: false, hours: "07:30", isDisabled: false },
                        { weekday: "Tue", date: "2024-12-03T00:00:00.000Z", isHoliday: false, hours: "06:00", isDisabled: false },
                        { weekday: "Wed", date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "05:00", isDisabled: false },
                        { weekday: "Thu", date: "2024-12-05T00:00:00.000Z", isHoliday: true, hours: "00:00", isDisabled: false },
                        { weekday: "Fri", date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true },
                        { weekday: "Sat", date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true }
                    ],
                    status: "approved"
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
                    status: "approved"
                }
            ]
        };

        // Extract unique dates
        const getUniqueDates = () => {
            const allDates: WeekDaysData[] = response.data.flatMap(timesheet =>
                timesheet.dataSheet.map(entry => ({
                    name: entry.weekday,
                    date: entry.date,
                    isHoliday: entry.isHoliday,
                    isDisabled: entry.isDisabled,
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
        // Set timesheet data
        setTimesheetTable(response.data);

        await run();
        setLoading(false)


    } catch (error) {
        console.error(error)
    }
}


async function fetchRejectedWeeks(setTable: (table: OverViewTable[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const response = {
            status: true,
            message: "Past Due",
            data: [
                {
                    startDate: "2024-11-20",
                    endDate: "2024-11-27",
                    status: "pastDue",
                    totalHours: 17,
                },
                {
                    startDate: "2024-11-28",
                    endDate: "2024-11-31",
                    status: "pastDue",
                    totalHours: 17,
                    Hours: 4
                },
                {
                    startDate: "2024-12-01",
                    endDate: "2024-12-07",
                    status: "pastDue",
                    totalHours: 17,
                    Hours: 4
                }
            ]
        };

        const tableData: OverViewTable[] = response.data.map(row => ({
            dateRange: `${enGBFormattter(row.startDate)} - ${enGBFormattter(row.endDate)}`,
            loggedHours: row.totalHours?.toString(), // Ensure it's a string if needed
            approvedHours: row.Hours?.toString()   // Ensure it's a string if needed
        }));


        setTable(tableData); // Pass the transformed data to setTable
        await run();
        setLoading(false);
    } catch (error) {
        console.error("Error fetching past due weeks:", error);
    }
}


async function fetchRejectedTimesheets(dateRangeString: string, setTimesheetTable: (table: TimesheetDataTable[]) => void, setDates: (dateArray: WeekDaysData[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const startDateString = dateRangeString.split("-")[0];
        const endDateString = dateRangeString.split("-")[1];

        const startDate = toISODateFormatter(startDateString);
        const endDate = toISODateFormatter(endDateString);

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
                        { weekday: "Sun", date: "2024-12-01T00:00:00.000Z", isHoliday: false, hours: "08:00", isDisabled: false },
                        { weekday: "Mon", date: "2024-12-02T00:00:00.000Z", isHoliday: false, hours: "07:30", isDisabled: false },
                        { weekday: "Tue", date: "2024-12-03T00:00:00.000Z", isHoliday: false, hours: "06:00", isDisabled: false },
                        { weekday: "Wed", date: "2024-12-04T00:00:00.000Z", isHoliday: false, hours: "05:00", isDisabled: false },
                        { weekday: "Thu", date: "2024-12-05T00:00:00.000Z", isHoliday: true, hours: "00:00", isDisabled: false },
                        { weekday: "Fri", date: "2024-12-06T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true },
                        { weekday: "Sat", date: "2024-12-07T00:00:00.000Z", isHoliday: false, hours: "00:00", isDisabled: true }
                    ],
                    status: "rejected"
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
                    status: "rejected"
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

        // Extract unique dates
        const getUniqueDates = () => {
            const allDates: WeekDaysData[] = response.data.flatMap(timesheet =>
                timesheet.dataSheet.map(entry => ({
                    name: entry.weekday,
                    date: entry.date,
                    isHoliday: entry.isHoliday,
                    isDisabled: entry.isDisabled,
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
        // Set timesheet data
        setTimesheetTable(response.data);

        await run();
        setLoading(false)


    } catch (error) {
        console.error(error)
    }
}








export { fetchProjects, saveTimesheets, fetchTaskCategories, fetchTimesheets, fetchPastDueWeeks, fetchPastDueTimesheets, fetchApprovedWeeks, fetchApprovedTimesheets, fetchRejectedWeeks, fetchRejectedTimesheets };
