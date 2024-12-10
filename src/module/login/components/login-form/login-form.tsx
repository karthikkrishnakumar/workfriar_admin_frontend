"use client";
import { useState } from "react";
import styles from "./login-form.module.scss";
import InputComponent from "@/themes/components/Input/Input";
import ButtonComponent from "@/themes/components/button/button";
import OtpForm from "../otp-form/otp-form";
import { loginWithGoogle } from "../../services/login-services/login-services";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [isOtp, setIsOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  /**
   * Handles Google login.
   *
   */
  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
      if (response.success) {
        router.push("/dashboard"); // Redirect to the homepage
      } else {
        console.error("Login failed:", response.message || "Unknown error");
      }
    } catch (err) {
      console.log("Failed to log in with Google.");
    }
  };

  /**
   * Handles email submission to continue to OTP verification.
   *
   */
  const handleContinueWithEmail = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setIsOtp(true); // Proceed only if the email is valid
  };

  if (isOtp) {
    return <OtpForm email={email} />;
  }

  return (
    <div>
      <div className={styles.form}>
        <h3>Log In</h3>

        <img src="/Google.svg" alt="Icon" className={styles.icon} />
        <ButtonComponent
          label="Continue with Google"
          onClick={handleGoogleLogin}
        />
        <div className={styles.divider}>
          <div className={styles.hr}></div>
          <p>or</p>
          <div className={styles.hr}></div>
        </div>
        <div className={styles.inputContainer}>
          <InputComponent
            label="Email"
            width="375px"
            height="58px"
            placeholder="Enter Email address"
            size="large"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button className={styles.button} onClick={handleContinueWithEmail}>
          Continue with Email
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
