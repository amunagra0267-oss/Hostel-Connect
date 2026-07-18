import React from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import Loader from "./Loader";

const ProtectedRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;