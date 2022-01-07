import { Route, Navigate } from "react-router-dom";

function PublicRoute({ children, isAuthenticated }) {
  return !isAuthenticated ? children : <Navigate to="/" />;
}

export default PublicRoute;
