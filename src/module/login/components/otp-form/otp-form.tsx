"use client";
import styles from "./otp-form.module.scss";
import OtpInput from "@/themes/components/otp-input/otp-input";
import Button from "@/themes/components/Button/Button";

const OtpForm: React.FC<{ email: string }> = ({ email }) =>{
  return (
    <div className={styles.form}>
      <h3>Enter OTP</h3>
      <p>Enter the verification code sent to {email}</p>
      <OtpInput />
      <div className={styles.link}>
      <p>Cant't find email? <a href="#">Resend OTP</a></p>
      </div>
      <Button label="Log In"/>
    </div>
  );
};

export default OtpForm;
