import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Landing() {
  const isLoged = localStorage.getItem(process.env.LOCAL_STORAGE_TOKEN_NAME);

  return (
    <>
      {!isLoged && <Navigate to="/login" state={true} />}
      <div>Landing</div>
    </>
  );
}

export default Landing;
