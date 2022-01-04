// lib
import { createUseStyles } from "react-jss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";

// Component
import IsEmptyObject from "../../../../service/js/IsEmptyObject";
import userAPI from "../../../../service/fetchAPI/userAPI";
import { useDispatch } from "react-redux";
import setAuthToken from "../../../../service/defaultAPI/setAuthToken";
import userSlice from "../../../../redux/slice/userSlice";

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

function UserForm(HandleLogin) {
  const [details, setDetails] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [errorForm, setErrorForm] = useState("");

  const Login = async ({ username, password, ...args }) => {
    try {
      let data = await userAPI().login({ username, password });
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("accepted", new Date().getTime());

      setErrorForm("");
      HandleLogin();
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
      setErrorForm(errForm);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errorsTemp = validateInfo(details);
    setErrors(errorsTemp);

    if (IsEmptyObject(errorsTemp)) {
      Login(details);
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

  return errors;
}

export default function SignIn() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function HandleLogin() {
    const userTemp = JSON.parse(localStorage.getItem("user"));

    setAuthToken(userTemp.token);
    await dispatch(userSlice.actions.setUser(userTemp));

    toast.success("🦄 Loggin successfully!");
    navigate("/collections");
  }

  const { handleChange, details, handleSubmit, errors, errorForm } =
    UserForm(HandleLogin);

  return (
    <div className={classes.SignIn}>
      <div className="content">
        <h1 className={classes.signin__title}>Sign In.</h1>

        <div className="buttons w-100">
          <button className="button btn--border btn--hover-border btn--full-width btn--flex btn--hover-trans">
            <div className="button__icon">
              <ion-icon name="logo-google"></ion-icon>
            </div>
            <div className="button__text">Continue with Google</div>
          </button>
          <button className="button btn--border btn--hover-border btn--full-width btn--flex btn--hover-trans">
            <div className="button__icon">
              <ion-icon name="logo-facebook"></ion-icon>
            </div>
            <div className="button__text">Continue with Facebook</div>
          </button>
        </div>

        <div className={classes.signin__separate}>or</div>

        <form onSubmit={handleSubmit} className="w-100">
          <div className="inputs">
            <div className={clsx(classes.input__group)}>
              <input
                type="text"
                placeholder="Username"
                className={clsx(
                  classes.signin__input,
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
                  classes.signin__input,
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
          </div>

          <button
            type="submit"
            className="button btn--bg-pink btn--bb-pink btn--none-border w-100"
          >
            <span className="button__text">Sign In</span>
          </button>

          {errorForm !== "" && (
            <div className={classes.signin__error}>*{errorForm}</div>
          )}
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
