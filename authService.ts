import http from "@/utils/http";
import { User } from "../../app/models/user";
import { Admin } from "@/module/app/models/admin";
import { setCookie, resetCookie } from "@/utils/intersection";

/**
 * profile response type
 */
export interface ProfileResponse {
	status: boolean;
	message: string;
	user?: User;
	errors?: Record<string, string>;
}

export interface AdminResponse {
	status: boolean;
	admin?: Admin;
	message: string;
	errors?: Record<string, string>;
}

export interface SendOtpResponse {
	status: boolean;
	message: string;
	errors?: Record<string, string>;
}

export interface VerifyOtpResponse {
	status: boolean;
	message: string;
	errors?: { [key: string]: string } | null;
}

export interface LogoutResponse {
	status: boolean;
	message: string;
	errors?: Record<string, string>;
}

/**
 * create the custom hook for handling admin authentication
 */
export default function useAuthService() {
	/**
	 * Method to send OTP for sign-up
	 *
	 * @param {string} first_name - Name of the user
	 * @param {string} last_name - Last name of the user
	 * @param {string} country_code - Country code of the user
	 * @param {string} country_unicode - Country unicode of the user
	 * @param {string} phone_number - Phone number of the user
	 * @param {string} email - Email of the user
	 * @return {Promise<AdminResponse>}
	 */
	const sentSignUpOtp = async function (
		first_name: string,
		last_name: string,
		country_code: string,
		country_unicode: string,
		phone_number: string,
		email: string
	): Promise<AdminResponse> {
		// Construct the payload
		const props: JSON = <JSON>(<unknown>{
			first_name,
			last_name,
			country_code,
			country_unicode,
			phone_number,
			email,
		});

		try {
			// Send the request to the API
			const { body } = await http().post(
				"api/admin/auth/sent_signup_otp",
				props,
				false
			);

			// Check the response and construct the return value
			if (body.status) {
				const response: AdminResponse = {
					status: body.status,
					message: body.message,
					admin: body.data ? body.data : undefined,
				};
				return response;
			} else {
				return {
					status: false,
					message: body.message,
					errors: body.errors,
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

	/**
	 * Verify admin email OTP
	 * @param email - The email of the admin
	 * @param otp - The OTP to verify
	 * @return Promise<VerifyOtpResponse>
	 */

	const verifySignupOtp = async function (
		email: string | undefined,
		otp: string
	): Promise<VerifyOtpResponse> {
		const props: JSON = <JSON>(<unknown>{
			email,
			otp,
		});

		try {
			// Send a POST request to the verification endpoint
			const { body } = await http().post(
				"api/admin/auth/verify_signup_otp",
				props,
				false // Assuming no token or authentication headers required
			);

			// If verification is successful, set the cookie
			if (body.status && body.data) {
				await setCookie(body.response, {
					token: body.data.token,
					email: email || '',
					role: 'admin'
				});
			}

			// Handle the API response
			return {
				status: body.status,
				message: body.message,
				errors: body.errors || null,
			};
		} catch (error: any) {
			// Return a meaningful error response
			return {
				status: false,
				message:
					error?.response?.data?.message ||
					"Failed to verify OTP. Please try again.",
				errors: error?.response?.data?.errors || null,
			};
		}
	};

	/**
	 * Method to send OTP for sign-in
	 *
	 * @param {string} email - Admin's email
	 * @return {Promise<AdminResponse>}
	 */
	const sentSignInOtp = async function (email: string): Promise<AdminResponse> {
		// Construct the payload
		const props: JSON = <JSON>(<unknown>{
			email,
		});

		try {
			// Send the request to the API
			const { body } = await http().post(
				"api/admin/auth/send_login_otp",
				props,
				false
			);

			// Check the response and construct the return value
			if (body.status) {
				const response: AdminResponse = {
					status: body.status,
					message: body.message,
					admin: body.data ? body.data : undefined, // Include admin data if available
				};
				return response;
			} else {
				return {
					status: false,
					message: body.message,
					errors: body.errors,
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

	/**
	 * Verify admin email OTP
	 * @param email - The email of the admin
	 * @param otp - The OTP to verify
	 * @return Promise<VerifyOtpResponse>
	 */

	const verifySignInOtp = async function (
		email: string | undefined,
		otp: string
	): Promise<VerifyOtpResponse> {
		const props: JSON = <JSON>(<unknown>{
			email,
			otp,
		});

		try {
			// Send a POST request to the verification endpoint
			const { body } = await http().post(
				"api/admin/auth/verify_login_otp",
				props,
				false
			);

			// If verification is successful, set the cookie
			if (body.status && body.data) {
				await setCookie(body.response, {
					token: body.data.token,
					email: email || '',
					role: 'admin'
				});
			}

			// Handle the API response
			return {
				status: body.status,
				message: body.message,
				errors: body.errors || null,
			};
		} catch (error: any) {
			// Return a meaningful error response
			return {
				status: false,
				message:
					error?.response?.data?.message ||
					"Failed to verify OTP. Please try again.",
				errors: error?.response?.data?.errors || null,
			};
		}
	};

	/**
	 * Logout the admin user
	 * @returns Promise<LogoutResponse>
	 */
	const logout = async function (): Promise<LogoutResponse> {
		try {
			// Send a POST request to the logout endpoint
			const { body } = await http().post(
				"api/admin/auth/logout",
				<JSON>{},
				true // Requires authentication
			);

			// Clear the cookie regardless of the response
			if (body.response) {
				resetCookie(body.response);
			}

			// Handle the API response
			return {
				status: body.status,
				message: body.message || "Logged out successfully",
				errors: body.errors || null,
			};
		} catch (error: any) {
			// Return a meaningful error response
			return {
				status: false,
				message:
					error?.response?.data?.message ||
					"Failed to logout. Please try again.",
				errors: error?.response?.data?.errors || null,
			};
		}
	};

	return {
		sentSignUpOtp,
		verifySignupOtp,
		sentSignInOtp,
		verifySignInOtp,
		logout,
	};
}
