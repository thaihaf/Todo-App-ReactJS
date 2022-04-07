// lib
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import { useSelector } from "react-redux";


// components
import Settings from "./UserSetting";
import isAuthenticated from "./../../../ultils/isAuthenticate"
import GoogleLogoutButton from "../../Buttons/LogoutButton";

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
      "url(https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png)",
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

  const isAuthen = isAuthenticated();
  
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
            {isAuthen.username}
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

        <GoogleLogoutButton />
      </div>

      <Settings
        toggleVal={toggleSettingBarVal}
        toggleFunc={toggleSettingBarFunc}
      />
    </div>
  );
}
