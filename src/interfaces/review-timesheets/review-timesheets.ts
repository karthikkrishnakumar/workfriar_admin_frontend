import { TimeEntry, TimesheetDataTable } from "../timesheets/timesheets";

export interface FetchReviewTimsheetResponses{
    status: boolean;
    message: string;
    data: TimesheetDataTable[];
    weekDates:TimeEntry[];
    errors?: Error | null;
}


interface UserDetails{
    id: string;
    name: string;
    profile_pic_path: string;
}

export interface UserDetailsResponse{
    status: boolean;
    message: string;
    data?: UserDetails;
    errors?: Error | null;
}

export interface ManageTimesheetStatusResponse{
    status: boolean;
    message: string;
    errors?: Error | null;
}