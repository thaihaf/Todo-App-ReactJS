// lib
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

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

export default function SignUp() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [errorForm, setErrorForm] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm();

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  const onSubmit = async (data) => {
    if (data.password === data.rePassword) {
      axios({
        method: "post",
        url: "auth/register",
        data: { username: data.username, password: data.password },
      })
        .then(() => {
          toast.success("🦄 Reistered successfully!");
          setErrorForm("");

          navigate("/users/signIn");
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          toast.error(errMsg);
          setErrorForm(errMsg);
        });
    } else {
      setErrorForm("Repassword doesn't match");
    }
  };

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

        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <div className="inputs">
            <div className={clsx(classes.input__group)}>
              <input
                className={clsx(
                  classes.signup__input,
                  "input--border input--focus-border btn--full-width",
                  errors.username && "btn--border-error"
                )}
                type="text"
                placeholder="Username"
                {...register("username", {
                  required: "This is required.",
                  minLength: {
                    value: 6,
                    message: "Min length is 6",
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
                  classes.signup__input,
                  "input--border input--focus-border btn--full-width",
                  errors.password && "btn--border-error"
                )}
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "This is required.",
                  minLength: {
                    value: 6,
                    message: "Min length is 6",
                  },
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <div className={clsx(classes.input__mess)}>
                  {errors.password?.message}
                </div>
              )}
            </div>

            <div className={clsx(classes.input__group)}>
              <input
                className={clsx(
                  classes.signup__input,
                  "input--border input--focus-border btn--full-width",
                  errors.rePassword && "btn--border-error"
                )}
                type="password"
                placeholder="Re-Password"
                {...register("rePassword", {
                  required: "This is required.",
                  minLength: {
                    value: 6,
                    message: "Min length is 6",
                  },
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <div className={clsx(classes.input__mess)}>
                  {errors.rePassword?.message}
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

          <div className={classes.signup__error}>{errorForm}</div>
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
