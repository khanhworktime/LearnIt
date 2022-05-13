import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
import { AuthContext } from "../contexts/authContext";
import { Spinner } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function Auth({ authRoute }) {
  const navigate = useNavigate();
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  let body;

  if (authLoading)
    body = (
      <div className="d-flex justify-conten-cneter mt-2">
        <Spinner animation="border" variant="info"></Spinner>
      </div>
    );
  else if (isAuthenticated) return navigate("/dashboard");
  else
    body = (
      <>
        {authRoute === "login" && <LoginForm />}
        {authRoute === "register" && <RegisterForm />}
      </>
    );

  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn It</h1>
          <h4>Keep tracking your learning progress</h4>
          {body}
        </div>
      </div>
    </div>
  );
}

export default Auth;
