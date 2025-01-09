
// Type definitions for the report data and response
export interface ReportData {
    project_name: string;
    project_lead: string;
    reporting_period: Date;
    progress: string;
    comments?: string;
    accomplishments: string;
    goals: string;
    blockers?: string;
  }
  export interface ValidationError {
    forEach(arg0: (error: { field: string; message: string }) => void): unknown;
    field: string;
    message: string;
  }
  
  export interface ReportsList {
    id: string;
    actual_start_date: string | null;
    actual_end_date: string | null;
    comments: string;
    progress: string;
    project_lead: string; // Assuming it's just a name
    project_name: string; // Assuming it's just a name
    reporting_period: string;
  }
  
  export interface ProjectStatusReportsResponse {
    status: boolean;
    data?: ReportsList[];
    total:number;
    message: string;
    errors?: ValidationError;
   
  }
  
  export interface ReportDetails {
    id: string;
    accomplishments: string;
    actual_start_date: string | null;
    actual_end_date: string | null;
    blockers: string;
    comments: string;
    createdAt: string;
    goals: string;
    planned_start_date: string | null;
    planned_end_date: string | null;
    progress: string;
    project_lead: {
      full_name: string;
      id: string;
      _id: string;
    };
    project_name: {
      id: string;
      name: string;
    };
    reporting_period: string;
  }
  
  export interface ProjectStatusReportDetailsResponse {
    status: boolean;
    message: string;
    errors?: ValidationError;
    data?: ReportDetails;
  }
  export interface AddProjectStatusReportResponse {
    status: boolean;
    message: string;
    errors?: ValidationError;
    data?: ReportData;
  }
  export interface EditProjectStatusReportResponse {
    status: boolean;
    message: string;
    errors?: ValidationError;
    data?: ReportData;
  }
  export interface DropDownData {
    id: string;
    name: string;
    project_lead?: {
      id: string;
      name: string;
    };
  }
  export interface DropDownResponse {
    status: boolean;
    data: DropDownData[];
    message: string;
    errors: string[] | null;
  }
  