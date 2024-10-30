import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, role }) => {
  const { currentUser, userRole } = useAuth();

   if (!currentUser) {
     return <Navigate to="/login" />;
   }

   if (role === "Admin" && userRole !== "Admin" && userRole !== "Both") {
     return <Navigate to="/" />;
   }

   if (role === "Staff" && userRole !== "Staff" && userRole !== "Both") {
     return <Navigate to="/" />;
   }

  return children;
};

export default PrivateRoute;
