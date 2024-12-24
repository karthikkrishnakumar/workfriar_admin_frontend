import { Suspense } from "react"
import LoginForm from "../components/login-form/login-form"


const LoginView = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
   <LoginForm/>
   </Suspense>

  )

}

export default LoginView