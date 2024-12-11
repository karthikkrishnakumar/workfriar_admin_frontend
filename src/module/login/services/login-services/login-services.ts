import http from "@/utils/http";

/**
 * Logs in using Google via the API.
 *
 * @returns A promise containing the response data.
 * @throws {Error} If the request fails, an error will be thrown.
 */
export const loginWithGoogle = async (): Promise<any> => {
  try {
    // Make an HTTP POST request to log in
    const response = await http().post("/api");
    return response;
  } catch (error) {
    console.error("Error during Google login:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

/**
 * Sends an OTP to the provided email address.
 *
 *
 * @param {string} email - The email address where the OTP should be sent.
 * @returns {Promise<any>} A promise containing the server's response data.
 * @throws {Error} If the request fails, an error will be thrown.
 */
export const sendOtp = async (email: string): Promise<any> => {
  try {
    const response = await http().post("/api");
    return response;
  } catch (error) {
    console.error("Error sending otp:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

/**
 * Verifies the OTP entered by the user.
 *
 * @param {string} otp - The OTP entered by the user.
 * @returns {Promise<any>} A promise containing the server's response data.
 * @throws {Error} If the request fails, an error will be thrown.
 */
export const verifyOtp = async (otp: string): Promise<any> => {
  try {
    const response = await http().post("/api");
    return response;
  } catch (error) {
    console.error("Error verifying otp:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
