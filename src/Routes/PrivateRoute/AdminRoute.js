import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import useAdmin from "../../Hooks/useAdmin";
import Loading from "../../Pages/Shared/Loading/Loading";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [admin, adminIsLoading] = useAdmin();
  const location = useLocation();

  if (loading || adminIsLoading) {
    return <Loading />;
  }

  if (user && admin) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
