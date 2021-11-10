// rfc
import React, { Component } from "react";

import "./signUp.css";

export default function SignUp() {
  return (
    <div className="SignUp">
      <div className="content">
        <h1 className="title">Sign Up.</h1>

        <button className="button btn--border btn--full-width btn--flex">
          <div className="button__icon">
            <ion-icon name="logo-google"></ion-icon>
          </div>
          <div className="button__text">Continue with Google</div>
        </button>
        <button className="button btn--border btn--full-width btn--flex">
          <div className="button__icon">
            <ion-icon name="logo-facebook"></ion-icon>
          </div>
          <div className="button__text">Continue with Facebook</div>
        </button>

        <div className="separate">or</div>

        <input
          type="email"
          placeholder="Email"
          className="input input--border btn--full-width"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input--border btn--full-width"
        />

        <button className="button btn--bg-pink btn--bb-pink btn--none-border btn--full-width btn--flex">
          <span className="button__text">Sign Up</span>
        </button>

        <div className="switch-links">
          <span>Already have an account?</span>
          <a href="sdd">Sign in</a>
        </div>

        <a href="#" className="switch-links">
          <ion-icon name="arrow-back-outline"></ion-icon>
          <div>Back to Home</div>
        </a>
      </div>
    </div>
  );
}
