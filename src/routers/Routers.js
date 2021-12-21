// lib
import { Routes, Route } from "react-router-dom";
import React from "react";

// components
import ErrorPage from "../components/ErrorPage/ErrorPage";
import Home from "../components/home/collection/view/Home";
import ScreenSaver from "../components/screenSaver/ScreenSaver";
import SignIn from "../components/users/view/signIn/SignIn";
import SignUp from "../components/users/view/signUp/SignUp";
import ListTasks from "../components/home/task/view/ListTasks";

export default function Routers({ HandleLogin, user }) {
  return (
    <div>
      <Routes>
        <Route path="*" element={<ErrorPage />} />
        <Route exact path="/" element={<ScreenSaver user={user} />} />
        <Route
          exact
          path="users/signIn"
          element={<SignIn HandleLogin={HandleLogin} />}
        />
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
