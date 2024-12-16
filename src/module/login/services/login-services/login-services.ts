import jwt from "jsonwebtoken";
import { setCookie } from "@/utils/intersection";
import http from "@/utils/http";

export const useAuthService = () => {

  const redirectToGoogleLogin = () => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    window.location.href = `${backendUrl}/api/auth/google-login`;
  };

  const validateAdminToken = (token: string): boolean => {
    try {
      const decodedToken = jwt.decode(token) as { 
        isAdmin: boolean; 
        email: string; 
        userId: string 
      };

      return decodedToken?.isAdmin === true;
    } catch (error) {
      return false;
    }
  };

  const handleAppLogin = async (
    token: string
  ): Promise<{ success: boolean; message?: string }> => { 'token jjklj'
    try {
      const payload = { token:`token ${token}` } as unknown as JSON;
      // Send a POST request to the verification endpoint
      const { body } = await http().post("/api/admin/auth/verify-admin",payload);
      // If the API returns a successful resptonse
      if (body.status && body.data) {

        // Set the cookie with the token
        await setCookie(body.response, {
          token: body.data.token,
        });

        return {
          success: true,
          message: "Login successful.",
        };
      }

      return {
        success: false,
        message: body.message || "Login failed.",
      };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "An error occurred during login.",
      };
    }
  };

  return { 
    redirectToGoogleLogin, 
    handleAppLogin,
    validateAdminToken 
  };
};



























// /**
//  * Sends an OTP to the provided email address.
//  *
//  *
//  * @param {string} email - The email address where the OTP should be sent.
//  * @returns {Promise<any>} A promise containing the server's response data.
//  * @throws {Error} If the request fails, an error will be thrown.
//  */
// export const sendOtp = async (email: string): Promise<any> => {
//   try {
//     const response = await http().post("/api");
//     return response;
//   } catch (error) {
//     console.error("Error sending otp:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };

// /**
//  * Verifies the OTP entered by the user.
//  *
//  * @param {string} otp - The OTP entered by the user.
//  * @returns {Promise<any>} A promise containing the server's response data.
//  * @throws {Error} If the request fails, an error will be thrown.
//  */
// export const verifyOtp = async (otp: string): Promise<any> => {
//   try {
//     const response = await http().post("/api");
//     return response;
//   } catch (error) {
//     console.error("Error verifying otp:", error);
//     throw error; // Rethrow the error to be handled by the caller
//   }
// };
