// lib
import React, { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store, { persistor } from "./redux/store";
import { Provider } from "react-redux";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { PersistGate } from "redux-persist/integration/react";

// import setAuthToken from "./helpers/setHeadersAxios";
import Loading from "./components/Loading";

window.addEventListener("error", (e) => {
  // prompt user to confirm refresh
  if (/Loading chunk [\d]+ failed/.test(e.message)) {
    window.location.reload();
  }
});

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
