import React, { useState } from "react";
import styles from "./password-login.module.scss";
import CustomInputField from "@/themes/components/input-field/input-field";
import ButtonComponent from "@/themes/components/button/button";
import { useRouter } from "next/navigation";
import { useAuthService } from "../../services/auth-service/auth-service";

interface PasswordLoginProps {
  email: string;
  onBack: () => void;
  onError: (error: string) => void;
  onLoading: (loading: boolean) => void;
  clearParams: () => void;
}

const PasswordLogin: React.FC<PasswordLoginProps> = ({
  email,
  onBack,
  onError,
  onLoading,
  clearParams,
}) => {
  const [password, setPassword] = useState("");
  const authService = useAuthService();
  const router = useRouter();

  const handleLogin = async () => {
    if (!password) {
      onError("Password cannot be empty.");
      return;
    }

    onLoading(true);
    try {
      const response = await authService.EmailLogin(email, password);

      if (response.status && response.data?.token) {
        const token = response.data.token;
        const loginResponse = await authService.handleAppLogin(token);
        if (loginResponse.success) {
          onError("");
          onLoading(true);
          router.push("/dashboard");
        } else {
          onLoading(false);
          onError(loginResponse.message || "Login failed.");
        }
      } else {
        onError(response.message || "Authentication failed!");
        
      onLoading(false);

      }
    } catch {
      onError("Something went wrong. Please try again.");
      onLoading(false);
    } 
  };

  return (
    <div className={styles.container}>
      <h3>Enter Password</h3>
      <p>Enter the password for {email}</p>
      <CustomInputField
        value={password}
        onChange={(value) => {
          setPassword(value);
          onError(""); // Clear error when user starts typing
          clearParams();
        }}
        placeholder="Enter your password"
        type="password"
        className={styles.input}
        onFocus={() => {
          onError(""); // Clear error when user starts typing
          clearParams();
        }}
        onEnterPress={handleLogin}
        autoFocus
      />
      <ButtonComponent
        label="Log In"
        onClick={handleLogin}
        className={styles.loginButton}
      />
      <p className={styles.back} onClick={onBack}>
        Back
      </p>
    </div>
  );
};

export default PasswordLogin;
