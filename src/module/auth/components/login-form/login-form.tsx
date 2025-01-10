"use client";
import { useEffect, useState } from "react";
import styles from "./login-form.module.scss";
import InputComponent from "@/themes/components/Input/Input";
import ButtonComponent from "@/themes/components/button/button";
import OtpForm from "../otp-form/otp-form";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthService } from "../../services/auth-service/auth-service";
import { Spin } from "antd";
import Icons from "@/themes/images/icons/icons";


const LoginForm = () => {
  const [isOtp, setIsOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { handleAppLogin, redirectToGoogleLogin } = useAuthService();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");

    const processLogin = async () => {

      if (token) {
      setLoading(true);

        const response = await handleAppLogin(token);

        if (response.success) {
          router.push("/dashboard");
        } else {
          setError(response.message || "Login failed.");
          setLoading(false)

        }
      } else if (errorParam) {
        setLoading(true);
        setError(errorParam || "Authentication failed. No account found.");
        setLoading(false);

      }
    };

    processLogin();
  }, [searchParams, handleAppLogin, router]);

  const handleGoogleLogin = () => {
    redirectToGoogleLogin(); // Redirect to backend Google login endpoint
  };

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
<div className={styles.container}>
  {loading && (
    <div className={styles.loaderOverlay}>
      <Spin size="large" className={styles.customspinner} />
    </div>
  )}
  <div className={styles.form}>
    <h3>Log In</h3>
    <ButtonComponent
      label="Continue with Google"
      onClick={handleGoogleLogin}
      defaultIcon={Icons.googleIcon}
      hoverIcon={Icons.googleIcon}
      className={styles.googleButton}
    />    
    {error && <p className={styles.error}>{error}</p>}
  </div>
</div>

  );
};

export default LoginForm;
