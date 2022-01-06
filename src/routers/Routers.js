// lib
import React from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors";
import { Routes, Route } from "react-router-dom";

// components
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Categories";
import ScreenSaver from "../pages/ScreenSaver";
import SignUp from "../pages/Account/SignUp";
import ListTasks from "../pages/Tasks";
import SignIn from "../pages/Account/SignIn";

export default function Routers() {
  const user = useSelector(userSelector);

  return (
    <div>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route exact path="/" element={<ScreenSaver />} />
        <Route exact path="users/signIn" element={<SignIn />} />
        <Route exact path="users/signUp" element={<SignUp />} />

        {user.username && (
          <React.Fragment>
            <Route exact path="collections" element={<Home />} />
            <Route exact path="tasks" element={<ListTasks />} />
          </React.Fragment>
        )}
      </Routes>
    </div>
  );
}
