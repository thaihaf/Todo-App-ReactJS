// lib
import { createUseStyles } from "react-jss";
import clsx from "clsx";
// import { useState } from "react";
// import axios from "axios";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  DeleteCollection: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    zIndex: "11",
    color: "#FFFFFF",
  },
  deleteCollection__bg: {
    backgroundColor: "#000",
    opacity: "70%",
  },
  deleteCollection__container: {
    width: "42rem",
    minWidth: "48rem",
    marginTop: "6rem",
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
  },
  deleteCollection__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  deleteCollection__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },

  deleteCollection__buttons: {
    gap: "1rem",
    marginTop: "3rem",
    width: "100%",
    display: "flex",
  },
  deleteCollection__bar: {
    marginBottom: "2rem",
    width: "100%",
  },

  deleteCollection__detail: {
    color: "gray",
    fontSize: "1.6rem",
  },
});

const DeleteCollection = ({ collection, toggleFunc, displayVal }) => {
  const classes = useStyles();

  const HandleSubmit = (e) => {
    e.preventDefault();

    toast.error(`This action is only designed for admin`);

    // axios
    //   .delete(`api/categories/${collection.id}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     const errMsg = err.response.data.message;
    //     console.log(errMsg);
    //   });
  };

  return (
    <div
      className={clsx(
        classes.DeleteCollection,
        "m-auto position-fixed",
        !displayVal && "d-none"
      )}
    >
      <div
        className={clsx(
          classes.deleteCollection__bg,
          "w-100 h-100 position-absolute"
        )}
        onClick={toggleFunc(false)}
      ></div>

      <div
        className={clsx(
          classes.deleteCollection__container,
          "position-absolute"
        )}
      >
        <form onSubmit={HandleSubmit}>
          <div className="deleteCollection__top d-flex w-100">
            <div className={clsx(classes.deleteCollection__caption, "mr-auto")}>
              delete collection
            </div>
            <div
              className="deleteCollection__close-btn"
              onClick={toggleFunc(false)}
            >
              <ion-icon name="close"></ion-icon>
            </div>
          </div>

          <div className="deleteCollection__details">
            <div className={clsx(classes.deleteCollection__detail)}>
              Are you sure you want to delete?
            </div>
            <div className={clsx(classes.deleteCollection__detail)}>
              This action cannot be undone.
            </div>
          </div>

          <div className={clsx(classes.deleteCollection__buttons)}>
            <button
              className="deleteCollection__button button btn--none-border ml-auto mb-0"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Delete
            </button>
            <button
              type="reset"
              className="deleteCollection__button button btn--none-border btn--hover-bg-gray mb-0"
              onClick={toggleFunc(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteCollection;
