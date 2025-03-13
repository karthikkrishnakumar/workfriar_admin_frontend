"use client";
import { useState, useEffect, useCallback } from "react";
import styles from "./login-form.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthService } from "../../services/auth-service/auth-service";
import { Spin } from "antd";
import Icons from "@/themes/images/icons/icons";
import CustomInputField from "@/themes/components/input-field/input-field";
import ButtonComponent from "@/themes/components/button/button";
import PasswordLogin from "../password-login/password-login";

const LoginForm = () => {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleAppLogin, redirectToGoogleLogin } = useAuthService();

  // Clear error and remove error parameter from URL
  const clearErrorAndParams = useCallback(() => {
    setError("");
    const currentUrl = new URL(window.location.href);
    if (currentUrl.searchParams.has("error")) {
      currentUrl.searchParams.delete("error");
      router.replace(currentUrl.toString(), { scroll: false });
    }
  }, [router]);
  useEffect(() => {
    const token = searchParams.get("token");
    const errorParam = searchParams.get("error");
  
    if (errorParam) {
      setError(errorParam);
    } else if (token && !loading) { // Prevent multiple executions
      setLoading(true);
      handleAppLogin(token).then((response) => {
        if (response.success) {
          router.push("/dashboard");
        } else {
          setLoading(false);
          setError(response.message || "Login failed.");
        }
      });
    }
  }, [searchParams]); // Remove `handleAppLogin` and `router` from dependencies
  

  const handleGoogleLogin = () => {
    clearErrorAndParams();
    redirectToGoogleLogin();
  };

  const handleContinueWithEmail = () => {
    clearErrorAndParams();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setStep("password");
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loaderOverlay}>
          <Spin size="large" className={styles.customspinner} />
        </div>
      )}
      <div className={styles.form}>
        {step === "email" ? (
          <>
            <h3>Log In</h3>
            <div className={styles.inputContainer}>
              <CustomInputField
                value={email}
                onChange={(value) => {
                  setEmail(value);
                  setError("");
                  clearErrorAndParams();
                }}
                placeholder="Enter Email Address"
                className={styles.input}
                onFocus={() => {
                  setError("");
                  clearErrorAndParams();
                }}
                onEnterPress={handleContinueWithEmail}
                autoFocus
              />
              <ButtonComponent
                label="Continue with Email"
                onClick={handleContinueWithEmail}
                className={styles.emailButton}
              />
              <div className={styles.divider}>
                <div className={styles.hr}></div>
                <p>or</p>
                <div className={styles.hr}></div>
              </div>
              <ButtonComponent
                label="Continue with Google"
                onClick={handleGoogleLogin}
                defaultIcon={Icons.googleIcon}
                hoverIcon={Icons.googleIcon}
                className={styles.googleButton}
              />
            </div>
          </>
        ) : (
          <PasswordLogin
            email={email}
            onBack={() => setStep("email")}
            onError={setError}
            onLoading={setLoading}
            clearParams={clearErrorAndParams}
          />
        )}
        {error ? (
          <div className={styles.error}>{error}</div>
        ) : (
          <div className={styles.emptyError}></div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
