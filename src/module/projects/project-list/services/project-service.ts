import http from "@/utils/http";
import dayjs from "dayjs";

/**
 * Interface representing the project data structure.
 * @interface ProjectData
 */
export interface ProjectData {
  _id: string;
  projectLogo: string;
  projectName: string;
  clientName: string;
  planned_start_date: string | dayjs.Dayjs;
  planned_end_date: string | dayjs.Dayjs;
  actual_start_date: string | dayjs.Dayjs;
  actual_end_date: string | dayjs.Dayjs;
  projectLead: string;
  projectDescription: string;
  billing_model: string;
  timeEntry: string;
  status: string;
}

/**
 * create the custom hook for handling project list
 */
export default function useProjectListService() {

  const fetchProjectDetailsById = async function (
    id: string
  ): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      id,
    });
    try {
      // Make an HTTP POST request
      // const { body } = await http().post("/admin/getforecast", props);
      // if (body.status) {
      //   const response: any = {
      //     status: body.status,
      //     message: body.message,
      //     data: body.data ? body.data : undefined,
      //   };
      //   return response;
      // } else {
      //   return {
      //     status: false,
      //     message: body.message,
      //   };
      // }
      const response = projectData;
      return response;
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const fetchProjectDetails = async function (): Promise<any> {
    try {
      // Make an HTTP POST request
      // const { body } = await http().post("/api");
      // if (body.status) {
      //   const response: any = {
      //     status: body.status,
      //     message: body.message,
      //     data: body.data ? body.data : undefined,
      //   };
      //   return response;
      // } else {
      //   return {
      //     status: false,
      //     message: body.message,
      //   };
      // }
      const response = projectDatas;
      return response;
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const changeStatus = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      payload,
    });
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api", props);
      if (body.status) {
        const response: any = {
          status: body.status,
          message: body.message,
          data: body.data ? body.data : undefined,
        };
        return response;
      } else {
        return {
          status: false,
          message: body.message,
        };
      }
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const changeTimeEntry = async function (id:string): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      id,
    });
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api", props);
      if (body.status) {
        const response: any = {
          status: body.status,
          message: body.message,
          data: body.data ? body.data : undefined,
        };
        return response;
      } else {
        return {
          status: false,
          message: body.message,
        };
      }
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const updateProject = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      payload,
    });
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api", props);
      if (body.status) {
        const response: any = {
          status: body.status,
          message: body.message,
          data: body.data ? body.data : undefined,
        };
        return response;
      } else {
        return {
          status: false,
          message: body.message,
        };
      }
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const addProject = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      payload,
    });
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api", props);
      if (body.status) {
        const response: any = {
          status: body.status,
          message: body.message,
          data: body.data ? body.data : undefined,
        };
        return response;
      } else {
        return {
          status: false,
          message: body.message,
        };
      }
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  return {
    fetchProjectDetailsById,
    fetchProjectDetails,
    changeStatus,
    updateProject,
    addProject,
    changeTimeEntry
  };
}


const projectData: ProjectData = 
  {
    _id: "1",
    projectLogo: "",
    projectName: "Diamond Lease",
    clientName: "Techfriar India",
    planned_start_date: "11/10/2024",
    planned_end_date: "02/05/2025",
    actual_start_date: "11/10/2024",
    actual_end_date: "02/05/2025",
    projectLead: "Aswina Vinod",
    timeEntry: "closed",
    status: "completed",
    projectDescription: "",
    billing_model: "Retainer",
  };

const projectDatas: ProjectData[] = [
  {
    _id: "1",
    projectLogo: "",
    projectName: "Diamond Lease",
    clientName: "Techfriar India",
    planned_start_date: "11/10/2024",
    planned_end_date: "02/05/2025",
    actual_start_date: "11/10/2024",
    actual_end_date: "02/05/2025",
    projectLead: "Aswina Vinod",
    timeEntry: "closed",
    status: "completed",
    projectDescription: "",
    billing_model: "Retainer",
  },
  {
    _id: "2",
    projectLogo: "",
    projectName: "Platinum Hire",
    clientName: "Techfriar India",
    planned_start_date: "15/11/2024",
    planned_end_date: "03/06/2025",
    actual_start_date: "15/11/2024",
    actual_end_date: "03/06/2025",
    projectLead: "John Doe",
    timeEntry: "opened",
    status: "in_progress",
    projectDescription: "",
    billing_model: "Retainer",
  },
];