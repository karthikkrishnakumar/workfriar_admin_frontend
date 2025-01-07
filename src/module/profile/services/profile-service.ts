import http from "@/utils/http";

/**
 * Interface representing the Profile data structure.
 * This interface defines the shape of the Profile data.
 * @interface ProfileData
 */
export interface ProfileData {
  id: string;
  profile_pic_path: string;
  name: string;
  email: string;
  location: string;
  phone: string;
  role: string;
  reporting_manager:{
    _id:string;
    full_name:string;
  } 
}

/**
 * create the custom hook for handling admin profile
 */
export default function useProfileService() {
  const getAdminDetails = async function (): Promise<any> {
    try {
      // Make an HTTP POST request
      const { body } = await http().post("/api/admin/profile-view");
      console.log(body);
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

  const updateAdminDetails = async function (payload: any): Promise<any> {
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
    getAdminDetails,
    updateAdminDetails,
  };
}

