// lib
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import userAPI from "../../../ultils/fetchAPI/userAPI";
import { userSelector } from "../../../redux/selectors";
import { handleLogin } from "../../../redux/reducers/userSlice";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { DeleteUser } from "../../Buttons/DeleteUser";

const useStyles = createUseStyles({
  Settings: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    zIndex: "11",
    color: "#FFFFFF",
  },
  settings__bg: {
    backgroundColor: "#000",
    opacity: "70%",
  },
  settings__container: {
    width: "42rem",
    minWidth: "48rem",
    marginTop: "6rem",
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
  },
  settings__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  settings__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },
  settings__colors: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, 6rem)",
  },
  settings__color: {
    width: "6rem",
    height: "5rem",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "1.2rem",
    transition: "all 0.1s ease-in-out",
    position: "relative",
  },
  settings__buttons: {
    gap: "1rem",
    marginTop: "5rem",
  },
  settings__groups: {
    padding: "1.5rem",
    border: "3px solid var(--background-color-header)",
    borderRadius: "1rem",
    height: "35rem",
    overflowY: "scroll",
  },
  settings__group: {
    marginBottom: "2rem",
    width: "100%",
  },
  settings__err: {
    color: "red",
    padding: "1rem",
    fontSize: "1.4rem",
  },
  settings__listColls: {
    height: "16rem",
    overflowY: "scroll",
    borderRadius: "1.2rem",
    border: "3px solid var(--background-color-header)",
  },
  settings__itemColl: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "2px solid var(--background-color-header)",
    gap: "1rem",
    cursor: "pointer",
  },
  settings__checkbox: {
    color: "var(--bg-btn-pink)",
    backgroundColor: "transparent",
    width: "1.7rem",
    height: "1.7rem",
  },
  settings__lable: {
    fontSize: "1.6rem",
  },
});

const Settings = ({ toggleVal, toggleFunc }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue,
    watch,
    setError,
  } = useForm();

  const onSubmit = async (data) => {
    if (watch("newpass") === watch("repass")) {
      setError("repass", {
        message: "",
      });

      const account = { username: user.username, password: data.newpass };
      const newAccount = { username: user.username, newPassword: data.newpass };

      try {
        await userAPI().updateUser(user.id, newAccount);
        toast.success("🦄 Change password successfully!");
        closeTabFunc();

        setTimeout(async () => {
          dispatch(handleLogin(account));
          localStorage.setItem("accepted", new Date().getTime());
        }, 500);
      } catch (error) {
        let errForm = error.message;
        toast.error(errForm);
        localStorage.setItem("user", JSON.stringify(user));
      }
    } else {
      setError("repass", {
        message: "Re-password not be match",
      });
    }
  };

  const closeTabFunc = () => {
    toggleFunc();
    setValue("newpass", "");
    setValue("repass", "");
  };

  useEffect(() => {
    setFocus("newpass");
  }, [setFocus]);

  return (
    <div
      className={clsx(
        classes.Settings,
        "m-auto position-fixed",
        !toggleVal && "d-none"
      )}
    >
      <div
        className={clsx(classes.settings__bg, "w-100 h-100 position-absolute")}
        onClick={closeTabFunc}
      ></div>

      <div className={clsx(classes.settings__container, "position-absolute")}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="settings__top d-flex w-100">
            <div className={clsx(classes.settings__caption, "mr-auto")}>
              Account Setting
            </div>
            <div className="settings__close-btn" onClick={closeTabFunc}>
              <ion-icon name="close"></ion-icon>
            </div>
          </div>

          <div className={clsx(classes.settings__groups)}>
            <div className={clsx(classes.settings__group, "bar-title")}>
              <div className={clsx(classes.settings__title)}>New Password</div>
              <input
                type="password"
                placeholder="new password"
                className="btn--outline w-100 py-3"
                style={{ fontSize: "1.6rem" }}
                autoComplete="new-password"
                {...register("newpass", {
                  required: "This is required.",
                  minLength: {
                    value: 6,
                    message: "Min length is 6",
                  },
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <div className={clsx(classes.settings__err)}>
                  {errors.newpass?.message}
                </div>
              )}
            </div>
            <div className={clsx(classes.settings__group, "bar-title")}>
              <div className={clsx(classes.settings__title)}>Re-Password</div>
              <input
                type="password"
                placeholder="re-password"
                className="btn--outline w-100 py-3"
                style={{ fontSize: "1.6rem" }}
                autoComplete="re-password"
                {...register("repass", {
                  required: "This is required.",
                  minLength: {
                    value: 6,
                    message: "Min length is 6",
                  },
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <div className={clsx(classes.settings__err)}>
                  {errors.repass?.message}
                </div>
              )}
            </div>
          </div>

          <div className={clsx(classes.settings__buttons, "w-100 d-flex")}>
            <DeleteUser />
            
            <button
              className="settings__button button btn--none-border btn--hover-bg-gray-light ml-auto mb-0"
              style={{ backgroundColor: "#3D3C50" }}
              type="submit"
            >
              Submit
            </button>
            <button
              type="reset"
              className="settings__button button btn--none-border btn--hover-bg-gray mb-0"
              onClick={closeTabFunc}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
