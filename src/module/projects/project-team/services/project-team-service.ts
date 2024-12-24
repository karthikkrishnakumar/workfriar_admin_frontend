import http from "@/utils/http";
import dayjs from "dayjs";

/**
 * Interface representing the Team member data structure.
 * @interface TeamMember
 */
export interface TeamMember {
  name: string;
  profile_pic?: string | null;
  id: string;
  email?: string;
  start_date?: string | dayjs.Dayjs;
  end_date?: string | dayjs.Dayjs;
  status?: string;
}

// Interface of a team member's data
export interface TimeLogged {
  _id: string;
  team_member: string;
  profile_pic?: string | null;
  email: string;
  total_time: number;
  approved_time: number;
  submitted_or_rejected_time:number;
}

export interface TimeLoggedResponse {
  data: TimeLogged[];
  dateRange?: string;
}

/**
 * Interface representing the ProjectTeam data structure.
 * @interface ProjectTeamData
 */
export interface ProjectTeamData {
  id: string;
  projectlogo: string;
  project_id: string;
  projectname: string;
  start_date: string | dayjs.Dayjs;
  end_date: string | dayjs.Dayjs;
  status: string;
  date:string
  teamMembers: TeamMember[];
}

/**
 * create the custom hook for handling project list
 */
export default function useProjectTeamService() {
  const fetchProjectTeamByProjectId = async function (
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
      const response = teamMembers;
      return response;
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const fetchProjectTeamDetails = async function (): Promise<any> {
    // const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload

    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/getallprojectteam");
      console.log(body)
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message || "Project teams retrieved successfully.",
        errors: body.errors || null,
      };
      const response = projectTeamData;
      return response;
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching project teams. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const fetchTimeLoggedByProjectId = async function (
    id: string,
    startDate: string,
    endDate: string,
    prev: boolean,
    next: boolean
  ): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      id,
      startDate,
      endDate,
      prev,
      next,
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
      const response = timeLoggedData;
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

  const changeMemberStatus = async function (payload: any): Promise<any> {
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

  const updateProjectTeam = async function (payload: any): Promise<any> {
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

  const addProjectTeam = async function (payload: any): Promise<any> {
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

  const fetchProjects = async function (): Promise<any> {
    // const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload

    try {
      // Make an HTTP POST request
      const type="projects";
      const { body } = await http().post(`/api/project-status-report/dropdown/${type}`);
      console.log(body);
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], 
        message: body.message || "Projects retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching projects. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  return {
    fetchProjectTeamByProjectId,
    fetchProjectTeamDetails,
    changeStatus,
    changeMemberStatus,
    updateProjectTeam,
    addProjectTeam,
    fetchTimeLoggedByProjectId,
    fetchProjects
  };
}

const teamMembers: TeamMember[] = [
  {
    _id: "1",
    name: "Alice",
    email: "alice@gmail.com",
    profile_pic:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

    start_date: "11/10/2024",
    end_date: "02/05/2025",
    status: "Inactive",
  },
  {
    _id: "2",
    name: "Bob",
    email: "bob@gmail.com",
    profile_pic:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

    start_date: "11/10/2024",
    end_date: "02/05/2025",
    status: "Inactive",
  },
];

const projectTeamData: ProjectTeamData[] = [
  {
    _id: "1",
    project_id: "1",
    ProjectLogo: "",
    ProjectName: "Diamond Lease",
    teamMembers: [
      {
        _id: "1",
        name: "Alice",
        profile_pic:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        status: "Inactive",
      },
      { _id: "2", name: "Bob", profile_pic: null, status: "completed" },
      { _id: "3", name: "Charlie", profile_pic: null, status: "completed" },
      { _id: "4", name: "Diana", profile_pic: null, status: "completed" },
    ],
    start_date: "11/10/2024",
    end_date: "02/05/2025",
    status: "Inactive",
  },
  {
    _id: "2",
    project_id: "2",
    ProjectLogo: "",
    ProjectName: "Platinum Hire",
    start_date: "15/11/2024",
    end_date: "03/06/2025",
    status: "Inactive",
    ProjectTeam: [
      {
        _id: "1",
        name: "Alice",
        profile_pic: null,
        status: "Inactive",
      },
      {
        _id: "2",
        name: "Bob",
        profile_pic:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        status: "Inactive",
      },
      { _id: "3", name: "Charlie", profile_pic: null, status: "completed" },
    ],
  },
];

const timeLoggedData: TimeLoggedResponse = {
  dateRange: "2024-11-01-2024-11-07",
  data: [
    {
      _id: "1",
      team_member: "Alice",
      email: "alice@gmail.com",
      profile_pic: null,

      total_time: 10,
      approved_time: 10,
      submitted_or_rejected_time:10
    },
    {
      _id: "2",
      team_member: "Bob",
      email: "bob@gmail.com",
      profile_pic:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      total_time: 10,
      approved_time: 10,
      submitted_or_rejected_time:10
    },
  ],
};
