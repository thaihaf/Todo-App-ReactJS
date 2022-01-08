// lib
import React, { lazy } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors";
import { Routes, Route } from "react-router-dom";

// components
import PublicRoute from "../../untils/routes/PublicRoute";
import PrivateRoute from "../../untils/routes/PrivateRoute";

import ScreenSaver from "../../pages/ScreenSaver";
import NotFoundComponent from "../NotFoundComponent";
import SignIn from "../../pages/Account/SignIn";
import SignUp from "../../pages/Account/SignUp";
import routes from "../../untils/routes/routes";

// const ScreenSaver = lazy(() => {
//   import("../../pages/ScreenSaver");
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
      <Route path="*" element={lazy(() => import("../components/NotFoundComponent"))} />
      <Route path="" element={lazy(() => import("../../pages/ScreenSaver"))} />
      <Route
        exact="true"
        path="users/signIn"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            {lazy(() => import("../pages/Account/SignUp"))}
          </PublicRoute>
        }
      />
      <Route
        exact="true"
        path="users/signUp"
        element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            {lazy(() => import("../pages/Account/SignIn"))}
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
