import { lazy } from "react";

const routes = [
  {
    path: "collections",
    component: lazy(() => import("../../pages/Categories")),
    exact: true,
  },
  {
    path: "tasks",
    component: lazy(() => import("../../pages/Tasks")),
    exact: true,
  },
];

export default routes;
