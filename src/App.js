// lib
import React, { Suspense } from "react";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component
import Header from "./components/Header";
import RouterComponent from "./components/RouterComponent";
import Loading from "./components/Loading";

import IsEmptyObject from "./ultils/checkObject/IsEmptyObject";
import isAuthenticated from "./ultils/isAuthenticate";

// Css
import "./App.css";
import userSlice from "./redux/reducers/userSlice";
import { userSelector } from "./redux/selectors";

// =================================================================
const useStyles = createUseStyles({
  App: {
    backgroundImage: "url(https://tsks.app/img/signin_balls.png)",
    backgroundColor: "#181820",
    backgroundPosition: "top",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    minWidth: "295px",
  },
});

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userTemp = useSelector(userSelector);
  const isAuthen = isAuthenticated();

  useEffect(() => {
    const expirationDuration = 1000 * 60 * 60; // 1 hours 2
    const prevAccepted = localStorage.getItem("accepted");
    const currentTime = new Date().getTime();

    const prevAcceptedExpired =
      prevAccepted && currentTime - prevAccepted < expirationDuration;

    if (prevAcceptedExpired && isAuthen) {
      console.log("Timein");
      dispatch(userSlice.actions.setUser(userTemp));
    } else {
      console.log("Timeout");
      localStorage.clear();
    }
  }, []);

  return (
    <div className={classes.App}>
      <Header />
      <Suspense fallback={<Loading />}>
        <RouterComponent />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
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
      </Suspense>
    </div>
  );
}
export default App;
