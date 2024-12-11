import { TeamMember } from "@/module/approval-center/services/all-time-sheet-services";
import { OverViewTable, run, TimesheetDataTable, WeekDaysData } from "@/module/time-sheet/services/time-sheet-services";
import { dateStringToMonthDate, enGBFormattter, toISODateFormatter } from "@/utils/date-formatter-util/date-formatter";

// function to fetch all counts of timesheet
async function fetchUserData(
    id: string,
    setPendingCount: (count: number) => void,
    setApprovedCount: (count: number) => void,
    setRejected: (count: number) => void,
    setOverDue: (count: number) => void,
    setLoading: (loading: boolean) => void,
    setuserData: (data: TeamMember) => void
): Promise<void> {
    try {
        const response = {
            status: "true",
            message: "Count fetched successfully",
            data: {
                count: {
                    pending: 10,
                    approved: 5,
                    rejected: 2,
                    overdue: 3
                },
                userData: {
                    id: "6748098aa081d9c94604c49e",
                    name: "Guruvayoorappan G R",
                },
            }
        };

        setPendingCount(response.data.count.pending);
        setApprovedCount(response.data.count.approved);
        setRejected(response.data.count.rejected);
        setOverDue(response.data.count.overdue);

        setuserData(response.data.userData);
        await run()
        setLoading(false);
    } catch (err) {
        console.error("Error fetching timesheet counts:", err);
    }
}


// function to detch all time sheets
async function fetchAllTimeSheetsToReview(
    startDate: Date | null,
    endDate: Date | null,
    setTimesheets: (timesheets: TimesheetDataTable[]) => void,
    setLoading: (loading: boolean) => void,
    setDates: (dates: WeekDaysData[]) => void
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

        setTimesheets(response.data);

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
        setLoading(false);
    } catch (err) {
        console.error("Error fetching timesheet:", err);
    }
}



async function fetchPendingWeeks(setTable: (table: OverViewTable[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
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
    } catch (err) {
        console.error("Error fetching pending weeks:", err);
    }
}


async function fetchPendingTimesheets(dateRangeString: string, setTimesheetTable: (table: TimesheetDataTable[]) => void, setDates: (dateArray: WeekDaysData[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
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
    } catch (err) {
        console.error(err)
    }
}


async function fetchApprovedWeeks(setTable: (table: OverViewTable[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const response = {
            status: true,
            message: "Approved",
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
    } catch (err) {
        console.error("Error fetching pending weeks:", err);
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
    } catch (err) {
        console.error(err)
    }
}

async function fetchRejectedWeeks(setTable: (table: OverViewTable[]) => void, setLoading: (loading: boolean) => void): Promise<void> {
    try {
        const response = {
            status: true,
            message: "Rejected",
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
    } catch (err) {
        console.error("Error fetching pending weeks:", err);
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
    } catch (err) {
        console.error(err)
    }
}


async function fetchOverdueWeeks(
    setTable: (table: OverViewTable[]) => void,
    setLoading: (loading: boolean) => void
): Promise<void> {
    try {
        const response = {
            status: true,
            message: "Rejected",
            data: [
                {
                    startDate: "2024-11-20",
                    endDate: "2024-11-27",
                    status: "pastDue",
                },
                {
                    startDate: "2024-11-28",
                    endDate: "2024-11-31",
                    status: "pastDue",
                },
                {
                    startDate: "2024-12-01",
                    endDate: "2024-12-07",
                    status: "pastDue",
                },
            ],
        };

        const tableData: OverViewTable[] = response.data.map((row) => ({
            dateRange: `${enGBFormattter(row.startDate)} - ${enGBFormattter(row.endDate)}`,
            loggedHours: (row as any).totalHours?.toString() , // Default to "0" if undefined
            approvedHours: (row as any).approvedHours?.toString(), // Return undefined if property is missing
        }));

        setTable(tableData);

        // If `run` is required, ensure it is defined
        if (typeof run === "function") {
            await run();
        }

        setLoading(false);
    } catch (err) {
        console.error("Error fetching pending weeks:", err);
        setLoading(false); // Ensure loading state is reset even on error
    }
}





export { fetchUserData, fetchAllTimeSheetsToReview, fetchPendingWeeks, fetchPendingTimesheets, fetchApprovedWeeks, fetchApprovedTimesheets, fetchRejectedWeeks, fetchRejectedTimesheets, fetchOverdueWeeks }