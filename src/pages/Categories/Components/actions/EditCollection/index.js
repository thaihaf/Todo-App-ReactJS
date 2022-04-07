// lib
import { createUseStyles } from "react-jss";
import clsx from "clsx";
// import { useState } from "react";
// import axios from "axios";

import useForm from "../ultils/useCollectionForm";
import useColor from "../ultils/useColor";
import { toast } from "react-toastify";

const useStyles = createUseStyles({
  EditCollection: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    zIndex: "11",
    color: "#FFFFFF",
  },
  editCollection__bg: {
    backgroundColor: "#000",
    opacity: "70%",
  },
  editCollection__container: {
    width: "42rem",
    minWidth: "48rem",
    marginTop: "6rem",
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
  },
  editCollection__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  editCollection__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },
  editCollection__colors: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, 6rem)",
  },
  editCollection__color: {
    width: "6rem",
    height: "5rem",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "1.2rem",
    transition: "all 0.1s ease-in-out",
    position: "relative",
  },
  editCollection__buttons: {
    gap: "1rem",
    marginTop: "5rem",
  },
  editCollection__group: {
    marginBottom: "2rem",
    width: "100%",
  },
  editCollection__err: {
    color: "red",
    padding: "1rem",
    fontSize: "1.4rem",
  },
});

const HandleEditCollection = (values) => {
  toast.error(`This action is only designed for admin`);
  console.log("Name New Collection : " + values.name);

  // const name = values.name;
  // axios({
  //   method: "post",
  //   url: "api/categories/${collection.id}",
  //   data: { name },
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     const errMsg = err.response.data.message;
  //     toast.error(errMsg);
  //   });
};

const EditCollection = ({ toggleFunc, displayVal }) => {
  const classes = useStyles();

  const { handleChange, handleSubmit, values, errors } =
    useForm(HandleEditCollection);
  const { handleChangeColor, listColors, colorValue } = useColor();

  const closeTabFunc = () => (event) => {
    handleChangeColor("")();
    toggleFunc(false)();
  };

  return (
    <div
      className={clsx(
        classes.EditCollection,
        "m-auto position-fixed",
        !displayVal && "d-none"
      )}
    >
      <div
        className={clsx(
          classes.editCollection__bg,
          "w-100 h-100 position-absolute"
        )}
        onClick={closeTabFunc(false)}
      ></div>

      <div
        className={clsx(classes.editCollection__container, "position-absolute")}
      >
        <form method="post" onSubmit={handleSubmit}>
          <div className="editCollection__top d-flex w-100">
            <div className={clsx(classes.editCollection__caption, "mr-auto")}>
              edit collection
            </div>
            <div
              className="editCollection__close-btn"
              onClick={closeTabFunc(false)}
            >
              <ion-icon name="close"></ion-icon>
            </div>
          </div>

          <div className={clsx(classes.editCollection__group, "bar-name")}>
            <div className={clsx(classes.editCollection__title)}>name</div>
            <input
              type="text"
              placeholder="My Collection"
              className="btn--outline w-100 py-3"
              style={{ fontSize: "1.6rem" }}
              name="name"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <div className={clsx(classes.editCollection__err)}>
                *{errors.name}
              </div>
            )}
          </div>

          <div className={clsx(classes.editCollection__group, "bar-color")}>
            <div className={clsx(classes.editCollection__title)}>color</div>

            <div className={clsx(classes.editCollection__colors, "w-100")}>
              {listColors.map(function (color) {
                return (
                  <div
                    className={clsx(classes.editCollection__color)}
                    key={`${color}`}
                    style={{
                      border: `3px solid ${color}`,
                      backgroundColor:
                        colorValue === color ? `${color}` : "transparent",
                    }}
                    onClick={handleChangeColor(color)}
                  ></div>
                );
              })}
            </div>
          </div>

          <div
            className={clsx(classes.editCollection__buttons, "w-100 d-flex")}
          >
            <button
              className="editCollection__button button btn--none-border btn--hover-bg-gray-light ml-auto mb-0"
              style={{ backgroundColor: "#3D3C50" }}
              type="submit"
            >
              Update
            </button>
            <button
              type="reset"
              className="editCollection__button button btn--none-border btn--hover-bg-gray mb-0"
              onClick={closeTabFunc()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCollection;
