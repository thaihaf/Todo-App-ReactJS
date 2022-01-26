import { Dialog, Slide } from "@mui/material";
import clsx from "clsx";
import { forwardRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { userSelector } from "../../../redux/selectors";
import userAPI from "../../../ultils/fetchAPI/userAPI";

const useStyles = createUseStyles({
  deleteUser__container: {
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
    color: "#FFFFFF",
    zIndex: "11",
  },
  deleteUser__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  deleteUser__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },

  deleteUser__buttons: {
    gap: "1rem",
    marginTop: "3rem",
    width: "100%",
    display: "flex",
  },
  deleteUser__bar: {
    marginBottom: "2rem",
    width: "100%",
  },

  deleteUser__detail: {
    color: "gray",
    fontSize: "1.6rem",
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const DeleteUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const user = useSelector(userSelector);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await userAPI().deleteUser(user.id);

      handleClose();
      toast.success("🦄 Delete User Successful!");

      localStorage.clear();
      window.location.assign("/signIn");
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  return (
    <div>
      <button
        className="settings__button button btn--none-border btn--hover-bg-gray-light mr-auto mb-0"
        style={{ backgroundColor: "red" }}
        type="button"
        onClick={handleOpen}
      >
        Delete
      </button>

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
        <div className={clsx(classes.deleteUser__container)}>
          <form onSubmit={handleSubmit}>
            <div className="deleteUser__top d-flex w-100">
              <div className={clsx(classes.deleteUser__caption, "mr-auto")}>
                delete user
              </div>
              <div className="deleteUser__close-btn" onClick={handleClose}>
                <ion-icon name="close"></ion-icon>
              </div>
            </div>

            <div className="deleteUser__details">
              <div className={clsx(classes.deleteUser__detail)}>
                Are you sure you want to delete?
              </div>
              <div className={clsx(classes.deleteUser__detail)}>
                This action cannot be undone.
              </div>
            </div>

            <div className={clsx(classes.deleteUser__buttons)}>
              <button
                className="deleteUser__button button btn--none-border ml-auto mb-0"
                style={{ backgroundColor: "red" }}
                type="submit"
              >
                Delete
              </button>
              <button
                type="reset"
                className="deleteUser__button button btn--none-border btn--hover-bg-gray mb-0"
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
};
