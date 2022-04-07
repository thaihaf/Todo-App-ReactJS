// lib
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/selectors";
import { Routes, Route } from "react-router-dom";
import routes from "../../routes";

// components
import PublicRoute from "../../routes/PublicRoute";
import PrivateRoute from "../../routes/PrivateRoute";

import NotFoundComponent from "../../components/NotFoundComponent";
import ScreenSaver from "../../pages/ScreenSaver";

// ultils
import isAuthenticated from "../../ultils/isAuthenticate";

export default function Routers() {
  const isAuthen = isAuthenticated();
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
                <PublicRoute isAuthenticated={isAuthen}>
                  {<Component />}
                </PublicRoute>
              ) : (
                <PrivateRoute isAuthenticated={isAuthen}>
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
