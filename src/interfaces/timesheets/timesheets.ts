export interface TimeEntry {
    day_of_week: string;
    date: string;
    is_holiday: boolean;
    hours: string;
    is_disable: boolean;
    formattedDate?: string;
}

export interface TimesheetDataTable {
    timesheet_id?: string;
    project_name: string;
    project_id?: string;
    category_name: string;
    task_category_id?: string;
    task_detail: string;
    data_sheet: TimeEntry[];
    status: string;
    total_hours?: number;
    local_id?: number;
    timesheetId?:string;
}

export interface WeekDaysData {
    name: string;
    date: string;
    isHoliday: boolean;
    formattedDate?: string;
    isDisabled: boolean;
}

export interface OverViewTable {
    startDate: string;
    endDate: string;
    totalHours?: string;
    approvedHours?: string;
}


// Project list
export interface ProjectList {
    id: string;
    project_name: string;
}

// task list
export interface CategoryList {
    _id: string;
    category: string;
}

export interface AllTimesheetResponse {
    status?: boolean;
    data: TimesheetDataTable[];
    message?: string;
    weekDates: TimeEntry[]
    errors?: Error | null;
}


export interface WeeksOverViewResponse {
    status: boolean;
    data: OverViewTable[];
    message?: string;
    errors?: Error | null;
}


export interface TimesheetsCountResponse {
    status: boolean;
    message: string;
    errors?: Error | null;
    data: {
        totalTimesheets: number;
        totalSaved: number;
        totalApproved: number;
        totalRejected: number;
    }
}

export interface PostResponses {
    status: boolean;
    message: string;
    errors?: Error | null;
    data?: TimesheetDataTable[];
}

export interface WeekDateEntry {
    day_of_week: string;
    date: string;
    is_holiday: boolean;
    is_disable: boolean;
    normalized_date: string;
}

export interface RejectedTimesheetResponse {
    status?: boolean;
    data: TimesheetDataTable[];
    message?: string;
    weekDates: TimeEntry[]
    errors?: Error | null;
}

export interface FetchTaskCategoriesResponse {
    status: boolean;
    data: CategoryList[];
    message?: string;
    errors?: Error | null;
}

export interface FetchProjectsResponse {
    status: boolean;
    data: ProjectList[];
    message?: string;
    errors?: Error | null;
}