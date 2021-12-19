// lib
import React from "react";
import { createUseStyles } from "react-jss";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Component
import Header from "./components/header/Header";
import Routers from "./routers/Routers";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Service
import setAuthToken from "./service/defaultAPI/setAuthToken";

// Css
import "./App.css";

// =================================================================
const useStyles = createUseStyles({
  App: {
    backgroundImage: "url(https://tsks.app/img/signin_balls.png)",
    backgroundColor: "#181820",
    backgroundPosition: "top",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
  },
});

function App() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [user, setUser] = useState({});

  // Function
  const HandleLogin = () => {
    const userTemp = JSON.parse(localStorage.getItem("user"));

    setAuthToken(userTemp.token);
    setUser(userTemp);

    setTimeout(() => {
      localStorage.removeItem("user");
      setAuthToken();
      setUser({});
    }, 3600000);

    toast.success("🦄 Loggin successfully!");
    navigate("collections");
  };
  const HandleLogout = () => {
    setUser({});

    localStorage.removeItem("user");
    toast.success("🦄 Logout successfully!");
    navigate("users/signIn");
  };

  useEffect(() => {
    const userTemp = JSON.parse(localStorage.getItem("user"));
    if (userTemp) {
      setAuthToken(userTemp.token);
      setUser(userTemp);
    }
  }, []);

  return (
    <div className={classes.App}>
      <Header
        HandleLogout={HandleLogout}
        HandleLogin={HandleLogin}
        user={user}
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
        style={{ fontSize: "1.4rem" }}
      />

      <Routers HandleLogin={HandleLogin} user={user} />
    </div>
  );
}
export default App;
