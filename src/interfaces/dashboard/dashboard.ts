  export interface ProjectTimeChartProps {
    project_name: string;
    hours: number;
  }
  export interface ProjectTimeResponse {
    status: string;
    data: ProjectTimeChartProps[];
    message: string;
    errors: Error | null;
  }
  export interface StatsProps {
    status: string;
    count: number;
  }
  export interface TimesheetSnapResponse {
    status: string;
    data: StatsProps[];
    message: string;
    errors: Error | null;
  }
  export interface TimesheetDue {
    dayOfWeek: string;
    date: string;
    hours: string;
    isDisable: boolean;
  }
  export interface TimesheetDueResponse {
    status: string;
    data: TimesheetDue[];
    message: string;
    errors: Error | null;
  }
  
  export interface Notification {
    id: string; // Unique identifier for the notification
    message: string; // The content of the notification
    time: string; // Timestamp of when the notification was sent
    is_read: boolean;
  }
  
  export interface NotificationResponse {
    status: string;
    data: Notification[] | [];
    message: string;
    errors: Error | null;
  }
  
  export interface Holidays {
    id: string; // Unique identifier for the notification
    holiday_name: string;
    holiday_date: string;
  }
  
  export interface HolidayResponse {
    status: string;
    data: Holidays[] | [];
    message: string;
    errors: Error | null;
  }
  
  export interface DatePickerData {
    startDate: string; // Start date in string format
    endDate: string; // End date in string format
    week: number; // Week number
    label: string; // Label associated with the date range
  }
  
  export interface DatePickerResponse {
    status: string;
    data: DatePickerData[];
    message: string;
    errors: Error | null;
  }
  
  export interface SaveTimesheetDueResponse {
    status: boolean;
    data: [];
    message: string;
    errors: Error | null;
  }
  