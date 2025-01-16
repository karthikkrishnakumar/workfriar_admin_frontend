// Simple interface for the token payload
interface TokenPayload {
    id: string;
    exp?: number;
  }
  
  // Function to generate a token with an employee ID
  export const generateToken = (id: string): string => {
    const payload: TokenPayload = {
      id,
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 // 1-day expiration
    };
  
    // Convert the payload to base64 and return it
    const encodedPayload = btoa(JSON.stringify(payload)); // Base64 encode the payload
    return encodedPayload;
  };
  
 
// Function to decode the token and retrieve the employee ID
export const decodeToken = (id: string): string | null => {
    try {
      // Decode the URL-encoded token first before base64 decoding
      const decodedUrlToken = decodeURIComponent(id); // Decodes %3D to '=' and similar encodings
  
      // Decode the base64 token to get the payload
      const decodedPayload = JSON.parse(atob(decodedUrlToken)) as TokenPayload;
  
      // Check if token has expired
      if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) {
        console.error('Token has expired');
        return null;
      }
  
      return decodedPayload.id; // Return the employee ID from the decoded payload
    } catch (error) {
      console.error('Invalid token:', error);
      return null;
    }
  };
  // Optional: If you need to check if a token is valid
  export const isValidToken = (token: string): boolean => {
    try {
      const decodedPayload = JSON.parse(atob(token)) as TokenPayload;
      return !!(decodedPayload.id && (!decodedPayload.exp || decodedPayload.exp > Math.floor(Date.now() / 1000)));
    } catch {
      return false;
    }
  };
  