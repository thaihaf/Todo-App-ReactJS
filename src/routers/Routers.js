// lib
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";
import { Routes, Route } from "react-router-dom";

// components
import PublicRoute from "../components/routes/PublicRoute";
import PrivateRoute from "../components/routes/PrivateRoute";

import ScreenSaver from "../pages/ScreenSaver";
import NotFoundComponent from "../components/NotFoundComponent";
import SignIn from "../pages/Account/SignIn";
import SignUp from "../pages/Account/SignUp";
import routes from "../untils/router/router";

// const ScreenSaver = lazy(() => {
//   import("../pages/ScreenSaver");
// });
// const SignUp = lazy(() => {
//   import("../pages/Account/SignUp");
// });
// const SignIn = lazy(() => {
//   import("../pages/Account/SignIn");
// });
// const NotFoundComponent = lazy(() => {
//   import("../components/NotFoundComponent");
// });

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
            <SignIn />
          </PublicRoute>
        }
      />
      <Route
        exact="true"
        path="users/signUp"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignUp />
          </PublicRoute>
        }
      />
      <Route
        exact="true"
        path="login"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <SignIn />
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
