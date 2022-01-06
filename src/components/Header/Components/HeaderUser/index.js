// lib
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../../redux/selectors";

// components
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import setAuthToken from "../../../../untils/defaultAPI/setAuthToken";
import userSlice from "../../../../redux/slice/userSlice";
import Settings from "./Components/UserSetting";

// service

// =================================================================
const useStyles = createUseStyles({
  users__avt: {
    width: "5rem",
    height: "5rem",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage:
      "url(" +
      "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" +
      ")",
    cursor: "pointer",
  },

  usersBar__hidden: {
    top: "105%",
    right: "4rem",
    minWidth: "25rem",
    fontSize: "1.4rem",
    border: "radius 0.7rem",
    color: "var(--text-color-light)",
    backgroundColor: "var(--background-color-header)",
    borderRadius: "1rem",
    "& > *": {
      padding: "1.5rem",
    },
  },

  settingBar: {
    cursor: "pointer",
  },
});

export default function HeaderUser() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function HandleLogout() {
    setAuthToken();
    dispatch(userSlice.actions.setUser({}));

    localStorage.removeItem("user");
    localStorage.removeItem("accepted");

    toast.success("🦄 Logout successfully!");
    navigate("users/signIn");
  }

  const user = useSelector(userSelector);
  const [showUserBar, setshowUserBar] = useState(false);

  const [toggleSettingBarVal, setToggleSettingBarVal] = useState(false);
  const toggleSettingBarFunc = () => {
    setToggleSettingBarVal(!toggleSettingBarVal);
  };

  return (
    <div className="usersBar">
      <div className="usersBar__display">
        <div
          className={clsx(classes.users__avt, "rounded-circle")}
          onClick={() => setshowUserBar(!showUserBar)}
        ></div>
      </div>

      <div
        className={clsx(
          classes.usersBar__hidden,
          "position-absolute",
          !showUserBar && "d-none"
        )}
      >
        <div className="usersBar__review">
          <div className="usersBar__title">Signed in as</div>
          <div className="usersBar__fullname font-weight-bold text-capitalize">
            {user.username}
          </div>
        </div>

        <button
          className={clsx(
            classes.settingBar,
            "button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left "
          )}
        >
          <div className="settingBar__display" onClick={toggleSettingBarFunc}>
            Account Settings
          </div>
          <div className="settingBar__hidden"></div>
        </button>

        <button
          className="signOutBtn button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left "
          style={{ padding: "1.5rem" }}
          onClick={HandleLogout}
        >
          Sign out
        </button>
      </div>

      <Settings
        toggleVal={toggleSettingBarVal}
        toggleFunc={toggleSettingBarFunc}
      />
    </div>
  );
}
