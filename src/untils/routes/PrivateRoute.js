import {  Navigate } from "react-router-dom";

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return isAuthenticated ? children : <Navigate to="/users/signIn" />;
}

export default PrivateRoute;
