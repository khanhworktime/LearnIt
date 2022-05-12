
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

function Auth({authRoute}) {
    let body;

    body = ( 
        <>
            {(authRoute === 'login') && <LoginForm />}
            {(authRoute === 'register') && <RegisterForm />}
        </>
    )

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
    )
}

export default Auth;