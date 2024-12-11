"use client";
import styles from "./otp-form.module.scss";
import OtpInput from "@/themes/components/otp-input/otp-input";
import Button from "@/themes/components/button/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  sendOtp,
  verifyOtp,
} from "../../services/login-services/login-services";

/**
 * OTP Form component that handles OTP input and verification.
 *
 * @param {string} email - The email address to which the OTP was sent.
 */
const OtpForm: React.FC<{ email: string }> = ({ email }) => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(5).fill(""));
  const [error, setError] = useState<string | null>(null);


  const handleOtpChange = (newOtp: string[]) => {
    setOtp(newOtp);
  };

  /**
   *
   * Sends an OTP email on component mount.
   */
  useEffect(() => {
    const sendOtpMail = async (email: string) => {
      try {
        const response = await sendOtp(email);
      } catch (error) {
        console.error("Error sending otp");
      }
    };
    sendOtpMail(email);
  }, []);

  /**
   * Verifies the OTP entered by the user.
   *
   */
  const verifyLogin = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    try {
      const response = await verifyOtp(otpString);
      if (response.success) {
        router.push("/dashboard"); // Redirect to the homepage
      } else {
        console.error("Login failed:", response.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching holiday data.");
    }
  };

  return (
    <div className={styles.form}>
      <h3>Enter OTP</h3>
      <p>Enter the verification code sent to {email}</p>
      <OtpInput value={otp} onChange={handleOtpChange} />
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.link}>
        <p>
          Cant't find email?{" "}
          <a onClick={() => sendOtp(email)} role="button" tabIndex={0}>
            Resend OTP
          </a>
        </p>
      </div>
      <Button label="Log In" onClick={verifyLogin} />
    </div>
  );
};

export default OtpForm;
