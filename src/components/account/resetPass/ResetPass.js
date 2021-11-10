import React from "react";
import "./resetPass.css";

export default function ResetPass() {
  return (
    <div className="ResetPass">
      <div className="content">
        <h1 className="title">Forgotten Password?</h1>

        <p className="desc">
          Don't worry, simply enter your email in the field below, then we'll
          send you a link to reset your password shortly.
        </p>

        <div class="sign-up__item " id="item-name">
          <div class="sign-up__title">Name</div>
          <div class="input-bar">
            <div class="input-bar__icons">
              <ion-icon
                name="person-outline"
                class="input-bar__icon left"
              ></ion-icon>
            </div>
            <input
              class="input input--border btn--full-width"
              id="name"
              name="fullname"
              rule="required|isName"
              type="text"
              placeholder="VD : Thai Ha"
            />
            <div class="input-bar__icons">
              <ion-icon
                name="checkmark-circle-outline"
                class="input-bar__icon icon__valid right"
              ></ion-icon>
              <ion-icon
                name="alert-circle-outline"
                class="input-bar__icon icon__invalid right"
              ></ion-icon>
            </div>
          </div>
          <div class="form__mess">*Error error</div>
        </div>
        {/*  */}
        <p className="error-mess">sfbsfbsfbsdfb</p>
        <div className="input-bar">
          <input
            type="email"
            placeholder="Email"
            className="input input--border btn--full-width"
          />
        </div>

        <button className="button btn--bg-pink btn--bb-pink btn--none-border btn--full-width">
          Send
        </button>

        <a href="#" className="switch-links">
          <ion-icon name="arrow-back-outline"></ion-icon>
          <div>Back to Sign in</div>
        </a>
      </div>
    </div>
  );
}
