  import http from "@/utils/http";
import jwt from "jsonwebtoken";

  export const useAuthService = () => {

    const apiUrl = "/api/auth";

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


    const handleAppLogin = async (token: string) => {
    try {
      // Validate the token and check if the user is an admin
      const isAdmin = validateAdminToken(token);

      if (isAdmin) {
        // If the user is an admin, set the cookie
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        

        // Parse the response JSON
        const data = await response.json();

        if (response.ok && data.success) {
          return { success: true, message: data.message || "Login successful", data };
        } else {
          return { success: false, message: data.message || "Failed to set cookie" };
        }
      } else {
        return { success: false, message: "You do not have admin privileges." };
      }
    } catch (error) {
      return { success: false, message: "An error occurred while processing login." };
    }
    };

    
    const handleLogout = async () => {
      try {

          const response = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });

          const data = await response.json();

          if (response.ok && data.success) {
            // Redirect to login page after successful logout
            window.location.href = "/";
            return { success: true, message: data.message || "Logout successful" };
          } else {
            return { success: false, message: data.message || "Logout failed" };
          }

        
      } catch (error) {
        return { success: false, message: "An error occurred during logout." };
      }
    };

    return {
      handleAppLogin,
      redirectToGoogleLogin,
      validateAdminToken,
      handleLogout
    };
  };
