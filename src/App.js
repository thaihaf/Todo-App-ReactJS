// lib
import React, { useState } from "react";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component
import Header from "./components/Header";
import Routers from "./routers/Routers";

// Css
import "./App.css";
import setAuthToken from "./untils/defaultAPI/setAuthToken";
import userSlice from "./redux/slice/userSlice";

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
  const classes = useStyles();
  const dispatch = useDispatch();

  const [timer, setTimer] = useState(() => {
    return 1000 * 60 * 60;
  });

  useEffect(() => {
    const expirationDuration = timer; // 1 hours 2
    const prevAccepted = localStorage.getItem("accepted");
    const currentTime = new Date().getTime();

    const prevAcceptedExpired =
      prevAccepted && currentTime - prevAccepted < expirationDuration;

    const userTemp = JSON.parse(localStorage.getItem("user"));

    if (prevAcceptedExpired && userTemp) {
      setAuthToken(userTemp.token);
      dispatch(userSlice.actions.setUser(userTemp));
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("accepted");

      setAuthToken();
      dispatch(userSlice.actions.setUser({}));
    }
  }, []);

  return (
    <div className={classes.App}>
      <Header />
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

      <Routers />
    </div>
  );
}
export default App;
