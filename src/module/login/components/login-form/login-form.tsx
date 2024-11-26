"use client";
import { useState } from "react";
import styles from "./login-form.module.scss";
import InputComponent from "@/themes/components/Input/Input";
import ButtonComponent from "@/themes/components/button/button";
import OtpForm from "../otp-form/otp-form";

const LoginForm = () => {
  const [isOtp, setIsOtp] = useState(false);
  const [email, setEmail] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  if (isOtp) {
    return <OtpForm email={email}/>;
  }

  return (
    <div>
      <div className={styles.form}>
        <h3>Log In</h3>
        
        <img
          src="/Google.svg"
          alt="Icon"
          className={styles.icon}
        />
        <ButtonComponent label="Continue with Google"/>
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
        onChange={handleEmailChange}/>
        </div>
        
        <button className={styles.button} onClick={() => setIsOtp(true)}>Continue with Email</button>
        {/* <Button label="Continue with Email"/> */}
      </div>
    </div>
  );


};

export default LoginForm;
