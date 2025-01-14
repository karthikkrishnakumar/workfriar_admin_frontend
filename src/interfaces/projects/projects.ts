/**
 * Interface representing the project data structure.
 * @interface ProjectData
 */
export interface ProjectData {
  id: string;
  project_name: string;
  client_name: {
    id: string;
    client_name: string;
  };
  actual_start_date: string;
  actual_end_date: string;
  project_lead: {
    id: string;
    full_name: string;
  };
  project_logo?: string;
  open_for_time_entry: string;
  status: string;
  planned_start_date?: string;
  planned_end_date?: string;
  description?: string;
  billing_model?: string;
  category?: [
    {
      id: string;
      name: string;
    }
  ];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectDisplayData {
  id: string;
  project_name: string;
  client_name: string;
  actual_start_date: string;
  actual_end_date: string;
  project_lead: string;
  project_logo?: string;
  open_for_time_entry: string;
  status: string;
}

export interface ProjectLead {
  _id: string;
  full_name: string;
}
export interface Member {
  id: string;
  name: string;
}
