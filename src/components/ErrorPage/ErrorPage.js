import { useEffect } from "react";
import { toast } from "react-toastify";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  errorPage__title: {
    fontSize: "5rem",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "var(--bg-btn-pink)",
  },
  errorPage__link: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginTop: "2rem",
    color: "var(--text-color)",
    fontSize: "1.6rem",
  },
});

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <div className="content">
      <div className={clsx(classes.errorPage__title)}>
        This page is not available
      </div>
      <Link to="/" className={clsx(classes.errorPage__link)}>
        <ion-icon name="arrow-back-outline"></ion-icon>
        <div>Back to Home</div>
      </Link>
    </div>
  );
}
