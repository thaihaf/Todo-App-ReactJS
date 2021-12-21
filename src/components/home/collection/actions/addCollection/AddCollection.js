// lib
import { createUseStyles } from "react-jss";
import clsx from "clsx";
// import { useState } from "react";
// import axios from "axios";
import { toast } from "react-toastify";

import useForm from "../services/useCollectionForm";
import useColor from "../services/useColor";

const useStyles = createUseStyles({
  AddCollection: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    zIndex: "11",
    color: "#FFFFFF",
  },
  addCollection__bg: {
    backgroundColor: "#000",
    opacity: "70%",
  },
  addCollection__container: {
    width: "42rem",
    minWidth: "48rem",
    marginTop: "6rem",
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
  },
  addCollection__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  addCollection__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },
  addCollection__colors: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, 6rem)",
  },
  addCollection__color: {
    width: "6rem",
    height: "5rem",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "1.2rem",
    transition: "all 0.1s ease-in-out",
    position: "relative",
  },
  addCollection__buttons: {
    gap: "1rem",
    marginTop: "5rem",
  },
  addCollection__group: {
    marginBottom: "2rem",
    width: "100%",
  },
  addCollection__err: {
    color: "red",
    padding: "1rem",
    fontSize: "1.4rem",
  },
});

const HandleCreateCollection = (values) => {
  toast.error(`This action is only designed for admin`);
  console.log("Name Collection : " + values.name);

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
  //     console.log(errMsg);
  //   });
};

const AddCollection = ({ toggleFunc, displayVal }) => {
  const classes = useStyles();

  const { handleChange, handleSubmit, values, errors } = useForm(
    HandleCreateCollection
  );
  const { handleChangeColor, listColors, colorValue } = useColor();

  const closeTabFunc = () => (event) => {
    handleChangeColor("")();
    toggleFunc(false)();
  };

  return (
    <div
      className={clsx(
        classes.AddCollection,
        "m-auto position-fixed",
        !displayVal && "d-none"
      )}
    >
      <div
        className={clsx(
          classes.addCollection__bg,
          "w-100 h-100 position-absolute"
        )}
        onClick={closeTabFunc}
      ></div>

      <div
        className={clsx(classes.addCollection__container, "position-absolute")}
      >
        <form method="post" onSubmit={handleSubmit}>
          <div className="addCollection__top d-flex w-100">
            <div className={clsx(classes.addCollection__caption, "mr-auto")}>
              add collection
            </div>
            <div
              className="addCollection__close-btn"
              onClick={closeTabFunc}
            >
              <ion-icon name="close"></ion-icon>
            </div>
          </div>

          <div className={clsx(classes.addCollection__group, "bar-name")}>
            <div className={clsx(classes.addCollection__title)}>name</div>
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
              <div className={clsx(classes.addCollection__err)}>
                *{errors.name}
              </div>
            )}
          </div>

          <div className={clsx(classes.addCollection__group, "bar-color")}>
            <div className={clsx(classes.addCollection__title)}>color</div>

            <div className={clsx(classes.addCollection__colors, "w-100")}>
              {listColors.map((color) => {
                return (
                  <div
                    className={clsx(classes.addCollection__color)}
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

          <div className={clsx(classes.addCollection__buttons, "w-100 d-flex")}>
            <button
              className="addCollection__button button btn--none-border btn--hover-bg-gray-light ml-auto mb-0"
              style={{ backgroundColor: "#3D3C50" }}
              type="submit"
            >
              Create
            </button>
            <button
              type="reset"
              className="addCollection__button button btn--none-border btn--hover-bg-gray mb-0"
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

export default AddCollection;
