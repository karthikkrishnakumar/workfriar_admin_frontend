import http from "@/utils/http";
import dayjs from "dayjs";

/**
 * Interface representing the client data structure.
 * @interface ClientData
 */
export interface ClientData {
  _id: string;
  client_name: string;
  location: string;
  client_manager: string;
  billing_currency: string;
  status: "completed" | "in_progress" | "on_hold" | "cancelled" | "not_started";
}

/**
 * create the custom hook for handling project list
 */
export default function useClientService() {
  const fetchClientDetails = async function (): Promise<any> {
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
      const response = clientData;
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

  const addClient = async function (payload: any): Promise<any> {
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
    fetchClientDetails,
    changeStatus,
    addClient,
  };
}

const clientData: ClientData[] = [
  {
    _id: "1",
    client_name: "Techfriar Technologies",
    location: "India",
    client_manager: "Aswina Vinod",
    billing_currency: "",
    status: "completed",
  },
  {
    _id: "2",
    client_name: "Techfriar Technologies",
    location: "Dubai",
    client_manager: "Aswina Vinod",
    billing_currency: "Dirham",
    status: "completed",
  },
];
