"use client"; // Ensures it runs on the client side

import React, { useState } from "react";
import styles from "./password-login.module.scss";
import CustomInputField from "@/themes/components/input-field/input-field";
import ButtonComponent from "@/themes/components/button/button";
import { useRouter } from "next/navigation";
import { useAuthService } from "../../services/auth-service/auth-service"; 

interface PasswordLoginProps {
  email: string;
  onBack: () => void;
  onError: (error: string) => void; // Pass error to parent component
  onLoading: (loading: boolean) => void;
}

const PasswordLogin: React.FC<PasswordLoginProps> = ({ email, onBack, onError ,onLoading }) => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async () => {
    if (!password) {
      onError("Password cannot be empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await useAuthService().EmailLogin(email, password);

      if (response.status) {
        onLoading(true); 
        router.push("/dashboard");
      } else {
        onError(response.message || "Authentication failed.");
      }
    } catch (error) {
      onError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
