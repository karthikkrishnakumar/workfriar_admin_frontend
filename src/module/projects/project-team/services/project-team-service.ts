import http from "@/utils/http";


/**
 * create the custom hook for handling project list
 */
export default function useProjectTeamService() {
  const fetchProjectTeamByProjectId = async function (
    id: string
  ): Promise<any> {
    const props: JSON = <JSON>(<unknown>
      id
     );
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/getprojectteam", props);
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message || "Project team retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching project team. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };
  const fetchProjectTeamDetails = async function (): Promise<any> {
    // const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload

    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/getallprojectteam");
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message || "Project teams retrieved successfully.",
        errors: body.errors || null,
      };
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
    projectId: string,
    startDate: string,
    endDate: string,
  ): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      projectId,
      startDate,
      endDate,
    });
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/timesummary", props);
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

  const changeStatus = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>
      payload
    );
    try {
      // Make an HTTP POST request
      const { body } = await http().post(`/api/project/updatestatus`, props);
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message,
        errors: body.errors,
      };
    } catch (error:any) {
      // Handle unexpected errors
      return {
        status: error,
        message:
          error?.response?.message ||
          "An error occurred while updating the status.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const updateDates = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>
      payload
    );
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/setenddate", props);
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
    const props: JSON = <JSON>(<unknown>
      payload
    );
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/editprojectteam", props);
      return {
        status: body.status,
        data: body.data || [],
        message: body.message || "Project team updated successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while updating project team. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const addProjectTeam = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>
      payload
    );
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/addprojectteam", props);
      return {
        status: body.status,
        data: body.data || [],
        message: body.message || "Project team added successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while adding project team. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const fetchProjects = async function (): Promise<any> {
    // const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload

    try {
      // Make an HTTP POST request
      const type = "projects";
      const { body } = await http().post(
        `/api/project-status-report/dropdown/${type}`
      );
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

  const fetchTeamMembers = async function (department:string): Promise<any> {
    const props: JSON = <JSON>(<unknown>{department}); // Request payload

    try {
      // Make an HTTP POST request
      
      const { body } = await http().post(
        `/api/admin/list-all-employees-by-department`,props
      );
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [],
        message: body.message || "Team members retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching members. Please try again.",
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
    fetchProjects,
    fetchTeamMembers,
    updateDates
  };
}
