import dayjs from "dayjs";
import http from "@/utils/http";


export interface TeamForecast {
  name: string; // Name of the team member
  forecast_hours: string; // Forecasted hours for the team member
}

/**
 * Interface representing the ProjectForecast data structure.
 * @interface ProjectForecastData
 */
export interface ProjectForecastData {
  id: string;
  opportunity_name: string;
  opportunity_manager: string;
  client_name: string;
  opportunity_date: string;
  opportunity_start_date: string | dayjs.Dayjs;
  opportunity_close_date: string | dayjs.Dayjs;
  opportunity_description?: string;
  billing_model?: string;
  expected_project_start_date?: string | dayjs.Dayjs;
  expected_project_end_date?: string | dayjs.Dayjs;
  expected_resource_breakdown?: string;
  estimated_revenue?: string;
  product_manager?: string;
  project_manager?: string;
  tech_lead?: string;
  account_manager?: string;
  estimated_project_completion?: number;
  team_forecast?: TeamForecast[];
  opportunity_stage: string;
  status: string;
}



/**
 * create the custom hook for handling project forecast
 */
export default function useProjectForecastService() {
  const fetchProjectForecastDetailsById = async function (
id: string
 ): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      id
    }
    );
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/getforecast", props);
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

  const fetchProjectForecastDetails = async function (): Promise<any> {
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/getallforecast");
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

  const updateProjectForecast = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>
      payload
    );
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/updateforecast", props);
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

  const addProjectForecast = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>
      payload
    );
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/addforecast", props);
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

  const deleteProjectForecast = async function (id: string): Promise<any> {
    const props: JSON = <JSON>(<unknown>{
      id,
    });
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/deleteforecast", props);
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
        message: "An error occurred while sending OTP. Please try again.",
      };
    }
  };

  return {
    fetchProjectForecastDetailsById,
    fetchProjectForecastDetails,
    changeStatus,
    updateProjectForecast,
    addProjectForecast,
    deleteProjectForecast,
  };
}
