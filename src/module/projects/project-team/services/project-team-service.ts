import http from "@/utils/http";
import dayjs from "dayjs";

/**
 * Interface representing the Team member data structure.
 * @interface TeamMember
 */
export interface TeamMember {
  name: string;
  profile_pic?: string | null;
  _id: string;
  email?: string;
  start_date?: string | dayjs.Dayjs;
  end_date?: string | dayjs.Dayjs;
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

// Interface of a team member's data
export interface TimeLoggedResponse {
  _id: string;
  name: string;
  profile_pic?: string | null;
  email: string;
  time_logged: number;
  time_approved: number;
}

/**
 * Interface representing the ProjectTeam data structure.
 * @interface ProjectTeamData
 */
export interface ProjectTeamData {
  _id: string;
  ProjectLogo: string;
  project_id: string;
  ProjectName: string;
  start_date: string | dayjs.Dayjs;
  end_date: string | dayjs.Dayjs;
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
  ProjectTeam: TeamMember[];
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
      const response = projectTeamData;
      return response;
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const fetchTimeLoggedByProjectId = async function (id: string): Promise<any> {
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

  return {
    fetchProjectTeamByProjectId,
    fetchProjectTeamDetails,
    changeStatus,
    changeMemberStatus,
    updateProjectTeam,
    addProjectTeam,
    fetchTimeLoggedByProjectId,
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
    status: "completed",
  },
  {
    _id: "2",
    name: "Bob",
    email: "bob@gmail.com",
    profile_pic:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

    start_date: "11/10/2024",
    end_date: "02/05/2025",
    status: "completed",
  },
];

const projectTeamData: ProjectTeamData[] = [
  {
    _id: "1",
    project_id: "1",
    ProjectLogo: "",
    ProjectName: "Diamond Lease",
    ProjectTeam: [
      {
        _id: "1",
        name: "Alice",
        profile_pic:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        status: "completed",
      },
      { _id: "2", name: "Bob", profile_pic: null, status: "completed" },
      { _id: "3", name: "Charlie", profile_pic: null, status: "completed" },
      { _id: "4", name: "Diana", profile_pic: null, status: "completed" },
    ],
    start_date: "11/10/2024",
    end_date: "02/05/2025",
    status: "completed",
  },
  {
    _id: "2",
    project_id: "2",
    ProjectLogo: "",
    ProjectName: "Platinum Hire",
    start_date: "15/11/2024",
    end_date: "03/06/2025",
    status: "in_progress",
    ProjectTeam: [
      {
        _id: "1",
        name: "Alice",
        profile_pic: null,
        status: "completed",
      },
      {
        _id: "2",
        name: "Bob",
        profile_pic:
          "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        status: "completed",
      },
      { _id: "3", name: "Charlie", profile_pic: null, status: "completed" },
    ],
  },
];

const timeLoggedData: TimeLoggedResponse[] = [
  {
    _id: "1",
    name: "Alice",
    email: "alice@gmail.com",
    profile_pic: null,

    time_logged: 10,
    time_approved: 10,
  },
  {
    _id: "2",
    name: "Bob",
    email: "bob@gmail.com",
    profile_pic:
      "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",

    time_logged: 10,
    time_approved: 10,
  },
];
