import dayjs from "dayjs";
import http from "@/utils/http";

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
    team_forecast: Array<{
        team_member_id: string;
        forecast_hours: number;
    }>;
    opportunity_stage: "closed_won" | "closed_lost";
    status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
  }

export const fetchProjectForecastDetailsById = async (id:string): Promise<any> => {
  try {
    // Make an HTTP POST request 
    // const response = await http().post("/api");
    const response = forecastData;
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const fetchProjectForecastDetails = async (): Promise<any> => {
    try {
      // Make an HTTP POST request 
      // const response = await http().post("/api");
      const response = forecastDatas;
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  export const changeStatus = async (statusData: any): Promise<any> => {
    try {
      const response = await http().post("/api");
      return response;
    } catch (error) {
      console.error("Error sending otp:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  export const updateProjectForecast = async (forecastData: any): Promise<any> => {
    try {
      const response = await http().post("/api");
      return response;
    } catch (error) {
      console.error("Error sending otp:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  export const addProjectForecast = async (forecastData: any): Promise<any> => {
    try {
      const response = await http().post("/api");
      return response;
    } catch (error) {
      console.error("Error sending otp:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };

  export const deleteProjectForecast = async (id: string): Promise<any> => {
    try {
      const response = await http().post("/api");
      return response;
    } catch (error) {
      console.error("Error sending otp:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  };


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
            team_member_id: "emp123",
            forecast_hours: 120,
        },
        {
            team_member_id: "emp456",
            forecast_hours: 80,
        },
    ]
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
            team_member_id: "emp123",
            forecast_hours: 120,
        },
        {
            team_member_id: "emp456",
            forecast_hours: 80,
        },
    ]
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
            team_member_id: "emp123",
            forecast_hours: 120,
        },
        {
            team_member_id: "emp456",
            forecast_hours: 80,
        },
    ]
    },
  ];