// lib
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { useState } from "react";
import { toast } from "react-toastify";
import taskAPI from "../../../../../service/fetchAPI/taskAPI";
import useTaskForm from "../../services/useTaskForm";

const useStyles = createUseStyles({
  EditTask: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    zIndex: "11",
    color: "#FFFFFF",
  },
  editTask__bg: {
    backgroundColor: "#000",
    opacity: "70%",
  },
  editTask__container: {
    width: "42rem",
    minWidth: "48rem",
    marginTop: "6rem",
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
  },
  editTask__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  editTask__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },
  editTask__colors: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, 6rem)",
  },
  editTask__color: {
    width: "6rem",
    height: "5rem",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "1.2rem",
    transition: "all 0.1s ease-in-out",
    position: "relative",
  },
  editTask__buttons: {
    gap: "1rem",
    marginTop: "5rem",
  },
  editTask__group: {
    marginBottom: "2rem",
    width: "100%",
  },
  editTask__err: {
    color: "red",
    padding: "1rem",
    fontSize: "1.4rem",
  },
  editTask__listColls: {
    height: "16rem",
    overflowY: "scroll",
    borderRadius: "1.2rem",
    border: "3px solid var(--background-color-header)",
  },
  editTask__itemColl: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "2px solid var(--background-color-header)",
    gap: "1rem",
    cursor: "pointer",
  },
  editTask__checkbox: {
    color: "var(--bg-btn-pink)",
    backgroundColor: "transparent",
    width: "1.7rem",
    height: "1.7rem",
  },
  editTask__lable: {
    fontSize: "1.6rem",
  },
});

const EditTask = ({
  listCollections,
  task,
  toggleFunc,
  displayVal,
  handleChangeData,
}) => {
  const classes = useStyles();

  const [listSelections, setListSelections] = useState(() => {
    let a = task.categories.map((category) => {
      return category.id;
    });
    return a;
  });

  const HandleEditTask = async (values) => {
    let title = values.title;
    let categoryIds = listSelections;
    let status = "IN_PROGRESS";
    let data = { title, categoryIds, status };
    try {
      const res = await taskAPI().updateTask(task.id, data);

      toast.success("🦄 Update Task Successful!");
      toggleFunc(false)();

      handleChangeData(await taskAPI().getTasks(`api/tasks?limit=6`));
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  const { handleChange, handleSubmit, values, errors } = useTaskForm(
    HandleEditTask,
    task
  );

  const closeTabFunc = () => (event) => {
    toggleFunc(false)();
  };

  const handleChangeOption = (id) => (event) => {
    let checked = event.target.checked;
    let existing = listSelections.includes(id);

    if (existing && !checked) {
      const newArr = listSelections.filter((select) => select !== id);
      setListSelections(newArr);
    } else if (!existing && checked) {
      setListSelections([...listSelections, id]);
    }
  };

  return (
    <div
      className={clsx(
        classes.EditTask,
        "m-auto position-fixed",
        !displayVal && "d-none"
      )}
    >
      <div
        className={clsx(classes.editTask__bg, "w-100 h-100 position-absolute")}
        onClick={closeTabFunc(false)}
      ></div>

      <div className={clsx(classes.editTask__container, "position-absolute")}>
        <form method="post" onSubmit={handleSubmit}>
          <div className="editTask__top d-flex w-100">
            <div className={clsx(classes.editTask__caption, "mr-auto")}>
              Edit Task
            </div>
            <div className="editTask__close-btn" onClick={closeTabFunc(false)}>
              <ion-icon name="close"></ion-icon>
            </div>
          </div>

          <div className={clsx(classes.editTask__group, "bar-title")}>
            <div className={clsx(classes.editTask__title)}>Title</div>
            <input
              type="text"
              placeholder="My Task"
              className="btn--outline w-100 py-3"
              style={{ fontSize: "1.6rem" }}
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            {errors.title && (
              <div className={clsx(classes.editTask__err)}>*{errors.title}</div>
            )}
          </div>

          <div className={clsx(classes.editTask__group, "bar-listColl")}>
            <div className={clsx(classes.editTask__title)}>List Collection</div>
            <div className={clsx(classes.editTask__listColls)}>
              {listCollections.map((item) => {
                return (
                  <div
                    key={item.id}
                    className={clsx(classes.editTask__itemColl)}
                  >
                    <input
                      type="checkbox"
                      className={clsx(classes.editTask__checkbox)}
                      checked={listSelections.find((id) => id === item.id)}
                      value={true}
                      onChange={handleChangeOption(item.id)}
                    />
                    <span className={clsx(classes.editTask__lable)}>
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={clsx(classes.editTask__buttons, "w-100 d-flex")}>
            <button
              className="editTask__button button btn--none-border btn--hover-bg-gray-light ml-auto mb-0"
              style={{ backgroundColor: "#3D3C50" }}
              type="submit"
            >
              Submit
            </button>
            <button
              type="reset"
              className="editTask__button button btn--none-border btn--hover-bg-gray mb-0"
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

export default EditTask;
