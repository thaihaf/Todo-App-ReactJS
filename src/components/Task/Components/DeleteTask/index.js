import { Dialog, Slide } from "@mui/material";
import clsx from "clsx";
import React, { forwardRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { toast } from "react-toastify";
import { getData } from "../../../../redux/reducers/dataSlice";
import taskAPI from "../../../../ultils/fetchAPI/taskAPI";

const useStyles = createUseStyles({
  deleteTask__container: {
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
    color: "#FFFFFF",
    zIndex: "11",
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DeleteTask({ task, handleChangeData }) {
  const classes = useStyles();
  const taskId = task?.id;

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await taskAPI().deleteTask(taskId);
      handleChangeData(getData());

      handleClose();
      toast.success("🦄 Delete Task Successful!");
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          " button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
        )}
        onClick={handleOpen}
      >
        delete task
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: {
            backgroundColor: "transparent",
            width: "80%",
            maxWidth: "48rem",
            boxShadow: "none",
            top: "-25%",
          },
        }}
      >
        <div className={clsx(classes.deleteTask__container)}>
          <form onSubmit={handleSubmit}>
            <div className="deleteTask__top d-flex w-100">
              <div className={clsx(classes.deleteTask__caption, "mr-auto")}>
                delete Task
              </div>
              <div className="deleteTask__close-btn" onClick={handleClose}>
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
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Dialog>
    </div>
  );
}
