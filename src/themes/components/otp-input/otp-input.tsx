import React, { useState } from "react";
import { Input } from "antd";
import styles from "./otp-input.module.scss";

const OtpInput: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(Array(5).fill("")); 

  const handleChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) { 
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically move to the next input
      if (value && index < 4) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
        const newOtp = [...otp];
        newOtp[index - 1] = ""; // Clear the previous box
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className={styles.otpContainer}>
      {otp.map((digit, index) => (
        <Input
          key={index}
          id={`otp-input-${index}`}
          className={styles.otpBox}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
        />
      ))}
    </div>
  );
};

export default OtpInput;
