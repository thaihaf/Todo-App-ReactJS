import React from "react";
import Header from "../header/Header";
import "./screenSaver.css";

export default function ScreenSaver() {
  return (
    <div className="ScreenSaver">
      <Header />

      <div className="content">
        <h1 className="title">Todo App</h1>
        <p className="desc">
          Keep track of the daily tasks in life and get that satisfaction upon
          copletion.
        </p>
        <div className="screenSaver__buttons">
          <button className="screenSaver__button button btn--none-border btn--bg-pink btn--bb-pink">
            get started
          </button>
          <button className="screenSaver__button button btn--none-border btn--bg-gray btn--bb-gray">
            learn more
          </button>
        </div>
      </div>
    </div>
  );
}
