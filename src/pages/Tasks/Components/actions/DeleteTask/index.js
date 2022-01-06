// lib
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { toast } from "react-toastify";
import taskAPI from "../../../../../untils/fetchAPI/taskAPI";
import { getData } from "../../../../../redux/slice/dataSlice";

const useStyles = createUseStyles({
  DeleteTask: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    zIndex: "11",
    color: "#FFFFFF",
  },
  deleteTask__bg: {
    backgroundColor: "#000",
    opacity: "70%",
  },
  deleteTask__container: {
    width: "42rem",
    minWidth: "48rem",
    marginTop: "6rem",
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
  },
  deleteTask__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  deleteTask__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },

  deleteTask__buttons: {
    gap: "1rem",
    marginTop: "3rem",
    width: "100%",
    display: "flex",
  },
  deleteTask__bar: {
    marginBottom: "2rem",
    width: "100%",
  },

  deleteTask__detail: {
    color: "gray",
    fontSize: "1.6rem",
  },
});

const DeleteTask = ({ taskIDs, toggleFunc, displayVal, handleChangeData }) => {
  const classes = useStyles();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (typeof taskIDs === "object") {
        taskIDs.forEach(async (taskID) => {
          await taskAPI().deleteTask(taskID);
          handleChangeData(getData());
        });
      } else {
        await taskAPI().deleteTask(taskIDs);
        handleChangeData(getData());
      }

      toggleFunc(false)();
      toast.success("🦄 Delete Task Successful!");
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  return (
    <div
      className={clsx(
        classes.DeleteTask,
        "m-auto position-fixed",
        !displayVal && "d-none"
      )}
    >
      <div
        className={clsx(
          classes.deleteTask__bg,
          "w-100 h-100 position-absolute"
        )}
        onClick={toggleFunc(false)}
      ></div>

      <div className={clsx(classes.deleteTask__container, "position-absolute")}>
        <form onSubmit={HandleSubmit}>
          <div className="deleteTask__top d-flex w-100">
            <div className={clsx(classes.deleteTask__caption, "mr-auto")}>
              delete Task
            </div>
            <div className="deleteTask__close-btn" onClick={toggleFunc(false)}>
              <ion-icon name="close"></ion-icon>
            </div>
          </div>

          <div className="deleteTask__details">
            <div className={clsx(classes.deleteTask__detail)}>
              Are you sure you want to delete?
            </div>
            <div className={clsx(classes.deleteTask__detail)}>
              This action cannot be undone.
            </div>
          </div>

          <div className={clsx(classes.deleteTask__buttons)}>
            <button
              className="deleteTask__button button btn--none-border ml-auto mb-0"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Delete
            </button>
            <button
              type="reset"
              className="deleteTask__button button btn--none-border btn--hover-bg-gray mb-0"
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

export default DeleteTask;
