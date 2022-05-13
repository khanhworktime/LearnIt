import { Button } from "react-bootstrap";
import { useNavigate, Navigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("learnit-accessToken");
    navigate("/login");
  };

  return (
    <>
      {!localStorage.getItem("learnit-accessToken") && <Navigate to="/login" />}
      <div className="dashboard">
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  );
}

export default Dashboard;
