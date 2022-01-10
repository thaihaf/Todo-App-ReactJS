// lib
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors";
import { Routes, Route } from "react-router-dom";
import routes from "../../untils/routes/routes";

// components
import PublicRoute from "../../untils/routes/PublicRoute";
import PrivateRoute from "../../untils/routes/PrivateRoute";

import NotFoundComponent from "../../components/NotFoundComponent";
import ScreenSaver from "../../pages/ScreenSaver";

export default function Routers() {
  const user = useSelector(userSelector);
  const isAuthenticated = user && user.token ? true : false;

  return (
    <Routes>
      <Route path="*" element={<NotFoundComponent />} />
      <Route path="" element={<ScreenSaver />} />

      {routes.map(({ component: Component, path, isPublic, ...res }) => {
        return (
          <Route
            {...res}
            key={path}
            path={path}
            element={
              isPublic ? (
                <PublicRoute isAuthenticated={isAuthenticated}>
                  {<Component />}
                </PublicRoute>
              ) : (
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  {<Component />}
                </PrivateRoute>
              )
            }
          />
        );
      })}
    </Routes>
  );
}
