import http from "@/utils/http";

/**
 * Interface representing the client data structure.
 * @interface ClientData
 */
export interface ClientData {
  _id: string;
  client_name: string;
  location_id: string;
  location: string;
  client_manager_id: string;
  client_manager: string;
  billing_currency_id: string;
  billing_currency: string;
  status: string;
}

/**
 * create the custom hook for handling project list
 */
export default function useClientService() {
  const fetchClientDetails = async function (
    page?: number,
    limit?: number
  ): Promise<any> {
    const props: JSON = <JSON>(<unknown>{ page, limit }); // Request payload

    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/all-clients", props);
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        total: body.pagination.totalItems || 0,
        message: body.message || "Clients retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching clients. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const fetchClientManagers = async function (): Promise<any> {
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin//get-client-managers ");
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message || "Client managers retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const fetchCountries = async function (): Promise<any> {
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/populate-country");
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message || "Countries retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const fetchCurrencies = async function (): Promise<any> {
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/populate-currency");
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message || "Currencies retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: false,
        message:
          error?.response?.data?.message ||
          "An error occurred while fetching data. Please try again.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const changeStatus = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>payload);
    try {
      // Make an HTTP POST request
      const { body } = await http().post(
        "/api/admin/change-client-status",
        props
      );
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
    const props: JSON = <JSON>(<unknown>payload);
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/add-client", props);
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

  const editClient = async function (payload: any): Promise<any> {
    const props: JSON = <JSON>(<unknown>payload);
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/edit-client", props);
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
    fetchCountries,
    fetchCurrencies,
    fetchClientManagers,
    editClient,
  };
}
