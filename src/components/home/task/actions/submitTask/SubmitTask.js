// lib
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { toast } from "react-toastify";
import taskAPI from "../../../../../service/fetchAPI/taskAPI";

const useStyles = createUseStyles({
  SubmitTask: {
    top: "0",
    left: "0",
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    zIndex: "11",
    color: "#FFFFFF",
  },
  submitTask__bg: {
    backgroundColor: "#000",
    opacity: "70%",
  },
  submitTask__container: {
    width: "42rem",
    minWidth: "48rem",
    marginTop: "6rem",
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
  },
  submitTask__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  submitTask__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },

  submitTask__buttons: {
    gap: "1rem",
    marginTop: "3rem",
    width: "100%",
    display: "flex",
  },
  submitTask__bar: {
    marginBottom: "2rem",
    width: "100%",
  },

  submitTask__detail: {
    color: "gray",
    fontSize: "1.6rem",
  },
});

const SubmitTask = ({ task, toggleFunc, displayVal, handleChangeData }) => {
  const classes = useStyles();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const title = task.title;
    const categoryIds = task.categories.map((category) => {
      return category.id;
    });
    const status = "IN_PROGRESS";

    let data = { title, categoryIds, status };

    try {
      await taskAPI().updateTask(task.id, data);

      toast.success("🦄 Submit Task Successful!");
      toggleFunc(false)();

      // handleChangeData(await taskAPI().getTasks(`api/tasks?limit=6`));
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  return (
    <div
      className={clsx(
        classes.SubmitTask,
        "m-auto position-fixed",
        !displayVal && "d-none"
      )}
    >
      <div
        className={clsx(
          classes.submitTask__bg,
          "w-100 h-100 position-absolute"
        )}
        onClick={toggleFunc(false)}
      ></div>

      <div className={clsx(classes.submitTask__container, "position-absolute")}>
        <form onSubmit={HandleSubmit}>
          <div className="submitTask__top d-flex w-100">
            <div className={clsx(classes.submitTask__caption, "mr-auto")}>
              submit Task
            </div>
            <div className="submitTask__close-btn" onClick={toggleFunc(false)}>
              <ion-icon name="close"></ion-icon>
            </div>
          </div>

          <div className="submitTask__details">
            <div className={clsx(classes.submitTask__detail)}>
              Are you sure you want to submit?
            </div>
            <div className={clsx(classes.submitTask__detail)}>
              This action cannot be undone.
            </div>
          </div>

          <div className={clsx(classes.submitTask__buttons)}>
            <button
              className="submitTask__button button btn--none-border ml-auto mb-0"
              style={{ backgroundColor: "red" }}
              type="submit"
            >
              Submit
            </button>
            <button
              type="reset"
              className="submitTask__button button btn--none-border btn--hover-bg-gray mb-0"
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

export default SubmitTask;
