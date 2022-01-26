// lib
import clsx from "clsx";
import { memo } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import isAuthenticated from "../../ultils/isAuthenticate";
// components
import HeaderUser from "./Components/HeaderUser";

// =================================================================

const Header = () => {
  const isAuthen = isAuthenticated();

  return (
    <div
      className={clsx(
        "Header",
        "position-fixed w-100 t-0 d-flex align-items-center"
      )}
    >
      <Link to="/" className={clsx("header__logo d-flex align-items-center")}>
        <ion-icon name="dice"></ion-icon>
        <div className={"header__logo_text"}>todo app</div>
      </Link>

      {isAuthen && (
        <div
          className={clsx("header__links", "d-flex align-items-center mr-auto")}
        >
          <Link to="/collections" className={clsx("header__link")}>
            <div className={clsx("header__link_text")}>Collections</div>
          </Link>
          <Link to="/tasks" className={clsx("header__link")}>
            <div className={clsx("header__link_text")}>Tasks</div>
          </Link>
        </div>
      )}

      {isAuthen ? (
        <HeaderUser />
      ) : (
        <div className={clsx("ml-auto btns--flex")}>
          <Link to="/signIn">
            <button className="button btn--none-border btn--hover-bb mb-0">
              Sign in
            </button>
          </Link>
          <Link to="/signUp">
            <button className="button btn--border btn--hover-border mb-0">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
