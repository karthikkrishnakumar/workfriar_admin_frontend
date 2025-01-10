export interface ValidationError {
  forEach(arg0: (error: { field: string; message: string }) => void): unknown;
  field: string;
  message: string;
}

export interface TimesheetReportsList {
  approved_hours: string;
  date_range: string;
  employee_name: string;
  logged_hours: string;
  month: string;
  year: string; // Assuming it's just a name
  project_name: string; // Assuming it's just a name
}

export interface TimesheetReportReportsResponse {
  status: boolean;
  data: TimesheetReportsList[];
  total: number;
  message: string;
  errors?: ValidationError;
}
