import React from "react";
import "./headerHome.css";

export default function HeaderHome() {
  return (
    <div className="HeaderHome w-100 position-fixed d-flex justify-content-between align-items-center">
      <a href="" className="logo d-flex flex-nowrap">
        <ion-icon name="dice-outline"></ion-icon>
        <div className="logo__text">DashBoard</div>
      </a>

      <div className="account">
        <div className="account__display">
          <div
            className="account__avt rounded-circle"
            style={{
              backgroundImage:
                "url(" +
                "https://www.kindpng.com/picc/m/78-786207_user-avatar-png-user-avatar-icon-png-transparent.png" +
                ")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          ></div>
        </div>

        <div className="account__hidden position-absolute d-none">
          <div className="account__review">
            <div className="account__title">Signed in as</div>
            <div className="account__fullname font-weight-bold">Thái Hà Nguyễn</div>
          </div>

          <div className="setting">
            <div className="setting__display">Account Settings</div>
            <div className="setting__hidden"></div>
          </div>

          <button className="signOutBtn button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left ">Sign out</button>
        </div>
      </div>
    </div>
  );
}
