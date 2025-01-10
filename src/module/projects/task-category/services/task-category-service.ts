import http from "@/utils/http";
import dayjs from "dayjs";

/**
 * Interface representing the TaskCategory data structure.
 * @interface TaskCategoryData
 */
export interface TaskCategoryData {
  id: string;
  category: string;
  timeentry: string;
}

/**
 * create the custom hook for handling project list
 */
export default function useTaskCategoryService() {
  const fetchTaskCategoryDetails = async function (): Promise<any> {
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/user/getcategories");
      
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message || "Task categories retrieved successfully.",
        errors: body.errors || null,
      };
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const updateTaskCategory = async function (
    payload: any
  ): Promise<any> {
    const props: JSON = <JSON>(<unknown>payload);
    try {
      // Make an HTTP POST request
      const { body } = await http().post(`/api/admin/updatecategories`, props);
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message,
        errors: body.errors,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: error,
        message:
          error?.response?.message ||
          "An error occurred while updating the category.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  const addTaskCategory = async function (
    payload: any
  ): Promise<any> {
    const props: JSON = <JSON>(<unknown>payload);
    try {
      // Make an HTTP POST request
      const { body } = await http().post(`/api/admin/addcategory`, props);
      // Handle the API response and return filtered data
      return {
        status: body.status,
        data: body.data || [], // Return the projects data
        message: body.message,
        errors: body.errors,
      };
    } catch (error: any) {
      // Return a meaningful error response
      return {
        status: error,
        message:
          error?.response?.message ||
          "An error occurred while adding the category.",
        errors: error?.response?.data?.errors || null,
      };
    }
  };

  return {
    fetchTaskCategoryDetails,
    updateTaskCategory,
    addTaskCategory,
  };
}

