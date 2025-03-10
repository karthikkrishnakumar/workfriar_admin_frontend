"use client";

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
  const [loading, setLoading] = useState(false);
  const authService = useAuthService();
  const router = useRouter();

  const handleLogin = async () => {
    if (!password) {
      onError("Password cannot be empty.");
      return;
    }

    setLoading(true);
    onLoading(true);
    try {
      const response = await authService.EmailLogin(email, password);
      
      if (response.status && response.data?.token) {
        const token = response.data.token;
        const loginResponse = await authService.handleAppLogin(token);
        
        if (loginResponse.success) {
          router.push("/dashboard");
        } else {
          onError(loginResponse.message || "Login failed.");
        }
      } else {
        onError(response.message || "Authentication failed!");
        router.push(`/?error=${encodeURIComponent(response.message || "Authentication failed!")}`);
      }
    } catch (error) {
      onError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
      onLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Enter Password</h3>
      <p>Enter the password for {email}</p>
      <CustomInputField
        value={password}
        onChange={setPassword}
        placeholder="Enter your password"
        type="password"
        className={styles.input}
        onFocus={clearParams}
      />
      <ButtonComponent
        label={loading ? "Logging in..." : "Log In"}
        onClick={handleLogin}
        className={styles.loginButton}
        disabled={loading}
      />
      <p className={styles.back} onClick={onBack}>
        Back
      </p>
    </div>
  );
};

export default PasswordLogin;
