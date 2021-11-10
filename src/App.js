// imr
import React from "react";
// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import { useState, useEffect } from "react" - imrse;

// import Component - ima
import Home from "./components/home/Home";
// import SignUp from "./components/account/signUp/SignUp";
// import SignIn from "./components/account/signIn/SignIn";
// import ResetPass from "./components/account/resetPass/ResetPass";

import "./App.css";

function App() {
  return (
    // <BrowserRouter>
    <div
      className="App"
      style={{
        backgroundImage: "url(" + "https://tsks.app/img/signin_balls.png" + ")",
        backgroundColor: "#181820",
      }}
    >
      <Home />
      {/* <Routes>
          <Route path="/" component={Home} exact />
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
        </Routes> */}
    </div>
    // </BrowserRouter>
  );
}
export default App;
