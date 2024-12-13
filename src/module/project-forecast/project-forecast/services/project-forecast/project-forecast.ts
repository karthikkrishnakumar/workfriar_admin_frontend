import dayjs from "dayjs";
import http from "@/utils/http";


export interface TeamForecast {
  team_member_id: string; // Name of the team member
  forecast_hours: number; // Forecasted hours for the team member
}

/**
 * Interface representing the ProjectForecast data structure.
 * @interface ProjectForecastData
 */
export interface ProjectForecastData {
  _id: string;
  opportunity_name: string;
  opportunity_manager: string;
  client_name: string;
  opportunity_start_date: string | dayjs.Dayjs;
  opportunity_close_date: string | dayjs.Dayjs;
  opportunity_description: string;
  billing_model: string;
  expected_start_date: string | dayjs.Dayjs;
  expected_end_date: string | dayjs.Dayjs;
  expected_resource_breakdown: string;
  estimated_value: string;
  product_manager: string;
  project_manager: string;
  tech_lead: string;
  account_manager: string;
  estimated_completion: number;
  team_forecast: TeamForecast[];
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
      const response = forecastData;
      return response;
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
      const response = forecastDatas;
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

  const updateProjectForecast = async function (payload: any): Promise<any> {
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

  const addProjectForecast = async function (payload: any): Promise<any> {
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

  const deleteProjectForecast = async function (id: string): Promise<any> {
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

const forecastData: ProjectForecastData = {
  _id: "1",
  opportunity_name: "Diamond Lease",
  client_name: "Techfriar India",
  opportunity_start_date: "11/10/2024",
  opportunity_close_date: "02/05/2025",
  opportunity_manager: "Aswina Vinod",
  opportunity_stage: "closed_won",
  status: "completed",
  opportunity_description: "description",
  billing_model: "",
  expected_start_date: "11/10/2024",
  expected_end_date: "11/10/2024",
  expected_resource_breakdown: "",
  estimated_value: "",
  product_manager: "Aswina Vinod",
  project_manager: "Aswina Vinod",
  tech_lead: "Aswina Vinod",
  account_manager: "Aswina Vinod",
  estimated_completion: 75,
  team_forecast: [
    {
      team_member_id: "Vishnu M S",
      forecast_hours: 120,
    },
    {
      team_member_id: "Guru",
      forecast_hours: 80,
    },
  ],
};

const forecastDatas: ProjectForecastData[] = [
  
  {
    _id: "1",
    opportunity_name: "Diamond Lease",
    client_name: "Techfriar India",
    opportunity_start_date: "11/10/2024",
    opportunity_close_date: "02/05/2025",
    opportunity_manager: "Aswina Vinod",
    opportunity_stage: "closed_won",
    status: "completed",
    opportunity_description: "description",
    billing_model: "",
    expected_start_date: "11/10/2024",
    expected_end_date: "11/10/2024",
    expected_resource_breakdown: "",
    estimated_value: "",
    product_manager: "Aswina Vinod",
    project_manager: "Aswina Vinod",
    tech_lead: "Aswina Vinod",
    account_manager: "Aswina Vinod",
    estimated_completion: 75,
    team_forecast: [
      {
        team_member_id: "Vishnu M S",
        forecast_hours: 120,
      },
      {
        team_member_id: "Guru",
        forecast_hours: 80,
      },
    ],
  },
  {
    _id: "2",
    opportunity_name: "Diamond Lease",
    client_name: "Techfriar India",
    opportunity_start_date: "11/10/2024",
    opportunity_close_date: "02/05/2025",
    opportunity_manager: "Aswina Vinod",
    opportunity_stage: "closed_lost",
    status: "completed",
    opportunity_description: "description",
    billing_model: "",
    expected_start_date: "11/10/2024",
    expected_end_date: "11/10/2024",
    expected_resource_breakdown: "",
    estimated_value: "",
    product_manager: "Aswina Vinod",
    project_manager: "Aswina Vinod",
    tech_lead: "Aswina Vinod",
    account_manager: "Aswina Vinod",
    estimated_completion: 75,
    team_forecast: [
      {
        team_member_id: "Vishnu M S",
        forecast_hours: 120,
      },
      {
        team_member_id: "Guru",
        forecast_hours: 80,
      },
    ],
  },
];
