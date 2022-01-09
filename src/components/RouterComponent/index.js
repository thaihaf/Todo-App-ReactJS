// lib
import { lazy } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors";
import { Routes, Route } from "react-router-dom";
import routes from "../../untils/routes/routes";

// components
import PublicRoute from "../../untils/routes/PublicRoute";
import PrivateRoute from "../../untils/routes/PrivateRoute";

const ScreenSaver = lazy(() => import("../../pages/ScreenSaver"));
const SignUp = lazy(() => import("../../pages/Account/SignUp"));
const SignIn = lazy(() => {
  return import("../../pages/Account/SignIn");
});
const NotFoundComponent = lazy(() => import("../NotFoundComponent"));

export default function Routers() {
  const user = useSelector(userSelector);
  const isAuthenticated = user && user.token ? true : false;

  return (
    <Routes>
      <Route path="*" element={<NotFoundComponent />} />
      <Route path="" element={<ScreenSaver />} />
      <Route
        exact="true"
        path="users/signIn"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            {<SignIn />}
          </PublicRoute>
        }
      />
      <Route
        exact="true"
        path="users/signUp"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            {<SignUp />}
          </PublicRoute>
        }
      />
      {routes.map(({ component: Component, path, exact }) => (
        <Route
          path={`${path}`}
          key={path}
          exact={exact}
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Component />
            </PrivateRoute>
          }
        />
      ))}
    </Routes>
  );
}
