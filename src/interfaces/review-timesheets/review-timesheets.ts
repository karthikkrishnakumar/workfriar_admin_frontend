import { TimesheetDataTable } from "../timesheets/timesheets";

export interface FetchReviewTimsheetResponses{
    status: boolean;
    message: string;
    data: TimesheetDataTable[];
    errors?: Error | null;
}