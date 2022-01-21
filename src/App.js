// lib
import React from "react";
import { createUseStyles } from "react-jss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component
import Header from "./components/Header";
import RouterComponent from "./components/RouterComponent";
import Loading from "./components/Loading";

// Css
import "./App.css";
import userSlice from "./redux/reducers/userSlice";
import { isLoadingSelector, userSelector } from "./redux/selectors";

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
  const isLoading = useSelector(isLoadingSelector);

  useEffect(() => {
    const expirationDuration = 1000 * 60 * 60; // 1 hours 2
    const prevAccepted = localStorage.getItem("accepted");
    const currentTime = new Date().getTime();

    const prevAcceptedExpired =
      prevAccepted && currentTime - prevAccepted < expirationDuration;

    if (prevAcceptedExpired && userTemp) {
      dispatch(userSlice.actions.setUser(userTemp));
    } else {
      localStorage.clear();
    }
  }, [dispatch, userTemp]);

  return (
    <div className={classes.App}>
      <Header />
      {isLoading && <Loading />}
      
      <RouterComponent />
      <ToastContainer
        position="top-center"
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
    </div>
  );
}
export default App;
