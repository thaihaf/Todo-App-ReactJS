// lib
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { toast } from "react-toastify";

// Component

// Service
import IsEmptyObject from "../../../../service/js/IsEmptyObject";

// =================================================================
const useStyles = createUseStyles({
  SignUp: {
    minHeight: "100vh",
  },
  signup__title: {
    fontSize: "5rem",
    marginBottom: "5rem",
  },
  signup__separate: {
    marginBottom: "2rem",
    fontSize: "1.5rem",
    color: "var(--text-color)",
  },
  signup__link: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "2rem",
    color: "var(--text-color)",
    fontSize: "1.6rem",
  },
  signup__link__light: {
    color: "var(--text-color-light) !important",
  },
  signup__input: {
    fontSize: "1.6rem",
    marginBottom: "1rem",
  },
  signup__error: {
    color: "red",
    textAlign: "left",
    fontSize: "1.3rem",
    marginBottom: "2rem",
  },
  input__mess: {
    color: "red",
    textAlign: "left",
    fontSize: "1.3rem",
    marginBottom: "2rem",
    marginLeft: "1.5rem",
  },
});

function UserForm() {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    username: "",
    password: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState({});
  const [errorForm, setErrorForm] = useState("");

  const Register = ({ username, password, ...args }) => {
    axios({
      method: "post",
      url: "auth/register",
      data: { username, password },
    })
      .then((result) => {
        toast.success("🦄 Reistered successfully!");
        setErrorForm("");

        navigate("/users/signIn");
      })
      .catch((err) => {
        const errMsg = err.response.data.message;
        toast.error(errMsg);

        setErrorForm(errMsg);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsTemp = validateInfo(details);
    setErrors(errorsTemp);

    if (IsEmptyObject(errorsTemp)) {
      Register(details);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  return { handleChange, details, handleSubmit, errors, errorForm };
}

function validateInfo(values) {
  let errors = {};

  if (!values.username.trim()) {
    errors.username = "Username required";
  } else if (values.username.trim().length < 6) {
    errors.username = "Username to be 6 charactor or more";
  }

  if (!values.password.trim()) {
    errors.password = "Password required";
  } else if (values.password.trim().length < 6) {
    errors.password = "Password to be 6 charactor or more";
  }

  if (!values.rePassword.trim()) {
    errors.rePassword = "RePassword required";
  } else if (values.rePassword.trim() !== values.password.trim()) {
    errors.rePassword = "RePassword do not match";
  }

  return errors;
}

export default function SignUp() {
  const classes = useStyles();
  const { handleChange, details, handleSubmit, errors, errorForm } = UserForm();

  return (
    <div className={classes.signup}>
      <div className="content">
        <h1 className={classes.signup__title}>Sign Up.</h1>

        <div className="buttons w-100">
          <button className="button btn--border btn--hover-border btn--full-width btn--flex  btn--hover-trans">
            <div className="button__icon">
              <ion-icon name="logo-google"></ion-icon>
            </div>
            <div className="button__text">Continue with Google</div>
          </button>
          <button className="button btn--border btn--hover-border btn--full-width btn--flex  btn--hover-trans">
            <div className="button__icon">
              <ion-icon name="logo-facebook"></ion-icon>
            </div>
            <div className="button__text">Continue with Facebook</div>
          </button>
        </div>

        <div className={classes.signup__separate}>or</div>

        <form onSubmit={handleSubmit} className="w-100">
          <div className="inputs">
            <div className={clsx(classes.input__group)}>
              <input
                type="text"
                placeholder="Username"
                className={clsx(
                  classes.signup__input,
                  "input--border input--focus-border btn--full-width",
                  errors.username && "btn--border-error"
                )}
                id="username"
                name="username"
                onChange={handleChange}
                value={details.username}
              />
              {errors.username && (
                <div className={clsx(classes.input__mess)}>
                  *{errors.username}
                </div>
              )}
            </div>

            <div className={clsx(classes.input__group)}>
              <input
                type="password"
                placeholder="Password"
                className={clsx(
                  classes.signup__input,
                  "input--border input--focus-border btn--full-width",
                  errors.password && "btn--border-error"
                )}
                id="password"
                name="password"
                onChange={handleChange}
                value={details.password}
              />
              {errors.password && (
                <div className={clsx(classes.input__mess)}>
                  *{errors.password}
                </div>
              )}
            </div>

            <div className={clsx(classes.input__group)}>
              <input
                type="password"
                placeholder="Re-Password"
                className={clsx(
                  classes.signup__input,
                  "input--border input--focus-border btn--full-width",
                  errors.rePassword && "btn--border-error"
                )}
                id="rePassword"
                name="rePassword"
                onChange={handleChange}
                value={details.rePassword}
              />
              {errors.rePassword && (
                <div className={clsx(classes.input__mess)}>
                  *{errors.rePassword}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="button btn--bg-pink btn--bb-pink btn--none-border w-100"
          >
            <span className="button__text">Sign Up</span>
          </button>

          {errorForm !== "" && (
            <div className={classes.signup__error}>*{errorForm}</div>
          )}
        </form>

        <div className={classes.signup__link}>
          <span>Already have an account?</span>
          <Link to="/users/signIn" className={classes.signup__link__light}>
            Sign in
          </Link>
        </div>

        <Link to="/" className={classes.signup__link}>
          <ion-icon name="arrow-back-outline"></ion-icon>
          <div>Back to Home</div>
        </Link>
      </div>
    </div>
  );
}
