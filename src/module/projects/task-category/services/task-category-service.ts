import http from "@/utils/http";
import dayjs from "dayjs";

/**
 * Interface representing the TaskCategory data structure.
 * @interface TaskCategoryData
 */
export interface TaskCategoryData {
  _id: string;
  task_category: string;
  timeEntry: string;
}

/**
 * create the custom hook for handling project list
 */
export default function useTaskCategoryService() {
  const fetchTaskCategoryDetails = async function (): Promise<any> {
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
      const response = taskCategoryDatas;
      return response;
    } catch (error) {
      // Handle unexpected errors
      return {
        status: false,
        message: "An error occurred. Please try again.",
      };
    }
  };

  const changeTimeEntry = async function (id: string): Promise<any> {
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

  const updateTaskCategory = async function (payload: any): Promise<any> {
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

  const addTaskCategory = async function (payload: any): Promise<any> {
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
    fetchTaskCategoryDetails,
    updateTaskCategory,
    addTaskCategory,
    changeTimeEntry,
  };
}

const taskCategoryDatas: TaskCategoryData[] = [
  {
    _id: "1",
    task_category: "Testing",
    timeEntry: "closed",
  },
  {
    _id: "2",
    task_category: "Development",
    timeEntry: "opened",
  },
];
