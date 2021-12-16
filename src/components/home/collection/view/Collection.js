// lib
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import clsx from "clsx";

// Component

const useStyles = createUseStyles({
  collection: {
    padding: "2.2rem 2.5rem",
    borderRadius: "2rem",
    gap: "2rem",
    cursor: "pointer",
    backgroundColor: "var(--background-color-header)",
    transition: "all ease 0.3s",
  },
  collection__tag: {
    padding: "1.3rem",
    borderRadius: "1.5rem",
    backgroundColor: "var(--bg-btn-pink)",
  },
  collection__name: {
    width: "fit-content",
    textAlign: "left",
    fontSize: "2rem",
    textTransform: "capitalize",
    display: "-webkit-box",

    overflow: "hidden",
    textOverflow: "ellipsis",
    wordBreak: "break-word",
  },
  collection__countTasks: {
    color: "#A1A1A6",
    fontSize: "1.6rem",
    width: "fit-content",
  },
});
export default function Collection({ collection }) {
  const classes = useStyles();

  const linkToTask = () => (event) => {};

  return (
    <Link to={`/collection/${collection.id}`}>
      <div
        className={clsx(classes.collection, "d-flex", "align-items-center")}
        // onClick={linkToTask()}
      >
        <div className={clsx(classes.collection__tag, "d-flex")}>
          <ion-icon
            name="bowling-ball-outline"
            style={{
              fontSize: "3.2rem",
            }}
          ></ion-icon>
        </div>
        <div className="collection__details">
          <div
            className={classes.collection__name}
            style={{
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {collection.name}
          </div>
          {/*<div className={classes.collection__countTasks}>No tasks</div>*/}
        </div>
      </div>
    </Link>
  );
}
