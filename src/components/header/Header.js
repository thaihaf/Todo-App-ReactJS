import React from "react";
import "./header.css";

export default function Header() {
  // const jsx = React.createElement(
  //   "h1",
  //   {
  //     title: "Hello",
  //     className: "h1-class",
  //   },
  //   "Hello anh em"
  // );
  return (
    <div className="Header">
      <a className="logo" href="http://">
        <div className="logo__img">
          <img src="" alt="" />
        </div>
        <div className="logo__text">todo</div>
      </a>
      <div className="header__buttons">
        <button
          href="svsdv"
          className="header__button button btn--none-border btn--hover-bb"
        >
          Sign in
        </button>
        <button
          href="sdvsdv"
          className="header__button button btn--border btn--hover-border"
        >
          Sign up
        </button>
      </div>
    </div>
  );
}
