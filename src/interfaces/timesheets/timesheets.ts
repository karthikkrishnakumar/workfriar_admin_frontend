export interface TimeEntry {
    weekday: string;
    date: string;
    isHoliday: boolean;
    hours: string;
    isDisabled: boolean;
    formattedDate?: string;
}

export interface TimesheetDataTable {
    timesheetId?: string;
    projectName: string;
    project_id?: string;
    categoryName: string;
    task_category_id?: string;
    taskDetail: string;
    dataSheet: TimeEntry[];
    status: string;
}

export interface WeekDaysData {
    name: string;
    date: string;
    isHoliday: boolean;
    formattedDate?: string;
    isDisabled: boolean;
}

export interface OverViewTable {
    dateRange: string;
    loggedHours?: string;
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