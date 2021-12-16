// lib
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import clsx from "clsx";

// components
import HeaderUser from "./HeaderUser";

// =================================================================
const useStyles = createUseStyles({
  Header: {
    padding: "2rem 10rem",
    fontSize: "1.6rem",
    backgroundColor: " #1d1d26",
    zIndex: "10",
    gap: "4rem",
    minWidth: "max-content",
  },
  header__logo: {
    textTransform: "uppercase",
    fontSize: "3rem",
    fontWeight: "700",
    gap: "1rem",
    color: "var(--bg-btn-pink)",
  },
  header__links: {
    gap: "2rem",
  },
});

export default function Header({ HandleLogout, HandleLogin, user }) {
  const classes = useStyles();

  return (
    <div
      className={`${classes.Header} position-fixed w-100 t-0 d-flex align-items-center`}
    >
      <Link
        to=""
        className={`${classes.header__logo} d-flex align-items-center`}
      >
        <ion-icon name="dice"></ion-icon>
        <div className={classes.header__logo_text}>todo app</div>
      </Link>

      {user.username && (
        <div
          className={clsx(
            classes.header__links,
            "d-flex align-items-center mr-auto"
          )}
        >
          <Link to="/collections" className={clsx(classes.header__link)}>
            <div className={classes.header__link_text}>Collections</div>
          </Link>
          <Link to="tasks" className={clsx(classes.header__link)}>
            <div className={classes.header__link_text}>Tasks</div>
          </Link>
        </div>
      )}

      {user.username ? (
        <HeaderUser
          HandleLogout={HandleLogout}
          HandleLogin={HandleLogin}
          user={user}
        />
      ) : (
        <div className={clsx("ml-auto btns--flex")}>
          <Link to="users/signIn">
            <button className="button btn--none-border btn--hover-bb mb-0">
              Sign in
            </button>
          </Link>
          <Link to="users/signUp">
            <button className="button btn--border btn--hover-border mb-0">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
