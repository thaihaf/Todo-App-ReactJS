import { lazy } from "react";

const routes = [
  {
    path: "collections",
    component: lazy(() => import("../../pages/Categories")),
    exact: true,
    isPublic: false,
  },
  {
    path: "tasks",
    component: lazy(() => import("../../pages/Tasks")),
    exact: true,
    isPublic: false,
  },
  // Public Router
  {
    path: "users/signIn",
    component: lazy(() => import("../../pages/Account/SignIn")),
    exact: true,
    isPublic: true,
  },
  {
    path: "users/signUp",
    component: lazy(() => import("../../pages/Account/SignUp")),
    exact: true,
    isPublic: true,
  },
];

export default routes;
