import React from "react";
import { Input } from "antd";
import styles from "./otp-input.module.scss";

interface OtpInputProps {
  value: string[];
  onChange: (otp: string[]) => void;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange }) => {
  const handleChange = (newValue: string, index: number) => {
    if (/^\d?$/.test(newValue)) {
      const newOtp = [...value];
      newOtp[index] = newValue;
      onChange(newOtp);

      // Automatically move to the next input
      if (newValue && index < 4) {
        const nextInput = document.getElementById(`otp-input-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
        const newOtp = [...value];
        newOtp[index - 1] = ""; // Clear the previous box
        onChange(newOtp);
      }
    }
  };

  return (
    <div className={styles.otpContainer}>
      {value.map((digit, index) => (
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
