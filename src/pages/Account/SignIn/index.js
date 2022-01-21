// lib
import { createUseStyles } from "react-jss";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { toast } from "react-toastify";

// Component
import { handleLogin } from "../../../redux/reducers/userSlice";
import GoogleLoginForm from "../../../components/Buttons/GoogleLoginButton";
import FacebookLoginButton from "../../../components/Buttons/FacebookLoginButton";

// =================================================================
const useStyles = createUseStyles({
  SignIn: {
    minHeight: "100vh",
  },
  signin__title: {
    fontSize: "5rem",
    marginBottom: "5rem",
  },
  signin__separate: {
    marginBottom: "2rem",
    fontSize: "1.5rem",
    color: "var(--text-color)",
  },
  signin__link: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "2rem",
    color: "var(--text-color)",
    fontSize: "1.6rem",
  },
  signin__link__light: {
    color: "var(--text-color-light) !important",
  },
  signin__input: {
    fontSize: "1.6rem",
    marginBottom: "1rem",
  },
  signin__error: {
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

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [errorForm, setErrorForm] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(handleLogin(data));
    navigate("/collections");

    setErrorForm("");
    toast.success("🦄 Loggin successfully!");
    localStorage.setItem("accepted", new Date().getTime());
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <div className={classes.SignIn}>
      <div className="content">
        <h1 className={classes.signin__title}>Sign In.</h1>

        <div className="buttons w-100">
          <GoogleLoginForm onSubmit={onSubmit} />
          <FacebookLoginButton onSubmit={onSubmit} />
        </div>

        <div className={classes.signin__separate}>or</div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <div className="inputs">
            <div className={clsx(classes.input__group)}>
              <input
                className={clsx(
                  classes.signin__input,
                  "input--border input--focus-border btn--full-width",
                  errors.username && "btn--border-error"
                )}
                type="text"
                placeholder="Username"
                autoComplete="username"
                {...register("username", {
                  required: "This is required.",
                  minLength: {
                    value: 4,
                    message: "Min length is 4",
                  },
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <div className={clsx(classes.input__mess)}>
                  {errors.username?.message}
                </div>
              )}
            </div>

            <div className={clsx(classes.input__group)}>
              <input
                className={clsx(
                  classes.signin__input,
                  "input--border input--focus-border btn--full-width",
                  errors.password && "btn--border-error"
                )}
                type="password"
                placeholder="Password"
                autoComplete="password"
                {...register("password", {
                  required: "This is required.",
                  minLength: {
                    value: 4,
                    message: "Min length is 4",
                  },
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <div className={clsx(classes.input__mess)}>
                  {errors.password?.message}
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="button btn--bg-pink btn--bb-pink btn--none-border w-100"
          >
            <span className="button__text">Sign In</span>
          </button>

          <div className={classes.signin__error}>{errorForm}</div>
        </form>

        <div className={classes.signin__link}>
          <span>Don't have an account?</span>
          <Link to="/users/signUp" className={classes.signin__link__light}>
            Sign up
          </Link>
        </div>

        <div
          className={clsx(classes.signin__link, classes.signin__link__light)}
        >
          Forgot password?
        </div>

        <Link to="/" className={classes.signin__link}>
          <ion-icon name="arrow-back-outline"></ion-icon>
          <div>Back to Home</div>
        </Link>
      </div>
    </div>
  );
}
