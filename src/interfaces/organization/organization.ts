
export interface FormValueData {
    _id: string;
    role: string; // Start date in string format
    department: string; // End date in string format
    status: boolean;
    users: [
      {
        id: string;
        full_name: string;
      }
    ];
  }

  export interface GetRolesResponse {
    status: string;
    data: FormValueData[];
    message: string;
    errors: Error | null;
  }
  

 export interface Employee {
   id: string;
   name: string;
   email: string;
   department: string;
   role: string;
   reporting_manager: string;
   status: boolean;
   profile_pic_path?: string;
   phone_number?: string;
   location?: string;
 }
  
  export interface GetAllEmployeeResponse {
    status: string;
    data: Employee[];
    total:number;
    message: string;
    errors: Error | null;
  }


  export interface EmployeeData {
    id?: string;
    name: string;
    email: string;
    phone_number: string;
    location: string;
    department: string;
    role: string;
    role_id: string;
    reporting_manager_id: string;
    reporting_manager: string;
    status:boolean;
    profile_pic?: File | null; // The avatar can be null if not provided
    profile_pic_path?:string;
  }

  export interface EditEmployeeData {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    location: string;
    role_id: string;
    reporting_manager_id: string;
    status:string;
    profile_pic?: File | null; // The avatar can be null if not provided
  }
  
  export interface GetEmployeeResponse {
    status: string;
    data: EmployeeData;
    message: string;
    errors: Error | null;
  }
  

  // Define the request payload structure for adding or editing an employee
 
  
  interface ValidationError {
    field: string;
    message: string;
  }
  export interface AddUserResponse {
    status: string;
    data: EmployeeData;
    message: string;
    errors?: ValidationError[];
  }
  
  export interface EditUserResponse {
    status: string;
    data: EmployeeData;
    message: string;
    errors?: ValidationError[];
  }
  
  export interface Project {
    id: string;
    project_name: string;
    client?: string;
    startDate?: string;
    endDate?: string;
    project_lead: string;
    status: string;
  }

    
  export interface GetEmployeePorjectsResponse {
    status: string;
    data: Project[];
    total:number;
    message: string;
    errors?: ValidationError[];
  }