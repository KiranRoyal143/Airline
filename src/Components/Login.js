import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/"); 
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="adminPage_SelectFlight">
      <button onClick={handleGoogleLogin}>Login with Google</button>
      {/* Add Facebook and Twitter buttons here */}
    </div>
  );
};

export default Login;
