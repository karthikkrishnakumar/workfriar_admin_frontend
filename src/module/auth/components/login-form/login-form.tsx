"use client"
import { useState, useEffect } from "react";
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
    const clearErrorAndParams = () => {

        const currentUrl = new URL(window.location.href);
        if (currentUrl.searchParams.has("error")) {
            currentUrl.searchParams.delete("error");
            router.replace(currentUrl.toString(), { scroll: false });
        }
        if (error && error !== "Authentication failed!." || error !== "server error[100]") {
            setError(null)
        }
    };

    const handleBack = () => {
        setStep("email");
        clearErrorAndParams();
    };


    useEffect(() => {
        const token = searchParams.get("token");
        const errorParam = searchParams.get("error");


        if (!errorParam && error === "Authentication failed!." || error === "server error[100]") {
            setError(null)
        }
        if (token) {
            setLoading(true);
            handleAppLogin(token).then((response) => {
                if (response.success) {
                    router.push("/dashboard");
                } else {
                    setError(response.message || "Login failed.");
                    setLoading(false);
                }
            });
        } else if (errorParam) {
            setError(errorParam || "Authentication failed!.");
        }
    }, [searchParams, handleAppLogin, router, clearErrorAndParams , handleBack]);

    // Modify existing functions to use clearErrorAndParams
    const handleGoogleLogin = () => {
        clearErrorAndParams();
        redirectToGoogleLogin();
    };

   
    const handleContinueWithEmail = async () => {
        // Clear error from Google login before proceeding
        clearErrorAndParams();

        // Delay execution to ensure the URL update happens before validation
        setTimeout(() => {
            if (!email || !/\S+@\S+\.\S+/.test(email)) {
                setError("Please enter a valid email address.");
                return;
            }
            setStep("password");
        }, 300);
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
                                onChange={setEmail}
                                placeholder="Enter Email Address"
                                className={styles.input}
                                onFocus={clearErrorAndParams} // Clear error when input is focused
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
                    <div className={styles.inputContainer}>
                        <PasswordLogin
                            email={email}
                            onBack={handleBack}
                            onError={setError}
                            onLoading={setLoading}
                            clearParams={clearErrorAndParams}
                        />
                    </div>
                )}
                {error ? <div className={styles.error}>{error}</div> : <div className={styles.emptyError}></div>}

            </div>
        </div>
    );
};

export default LoginForm;