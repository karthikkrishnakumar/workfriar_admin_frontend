import { Suspense } from "react"
import LoginForm from "../components/login-form/login-form"
import { Spin } from "antd"
import styles from "./page.module.scss";


const LoginView = () => {
  return (
      <Suspense
      fallback={
        <div className={styles.spinnerContainer}>
          <Spin size="large" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )

}

export default LoginView