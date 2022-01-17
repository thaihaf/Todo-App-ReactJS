// lib
import React from "react";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./redux/store";

// Component
import Header from "./components/Header";
import RouterComponent from "./components/RouterComponent";

// Css
import "./App.css";
import setAuthToken from "./helpers/setHeadersAxios";
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

  useEffect(() => {
    const expirationDuration = 1000 * 60 * 60; // 1 hours 2
    const prevAccepted = localStorage.getItem("accepted");
    const currentTime = new Date().getTime();

    const prevAcceptedExpired =
      prevAccepted && currentTime - prevAccepted < expirationDuration;

    if (prevAcceptedExpired && userTemp) {
      // setAuthToken(userTemp.token);
      dispatch(userSlice.actions.setUser(userTemp));
    } else {
      localStorage.clear();
    }
  }, [dispatch, userTemp]);

  return (
    <div className={classes.App}>
      <Header />

      <RouterComponent />

      <ToastContainer
        position="top-center"
        autoClose={2000}
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
    </div>
  );
}
export default App;
