import { Dialog, Slide } from "@mui/material";
import clsx from "clsx";
import React, { useState } from "react";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { createUseStyles } from "react-jss";
import { toast } from "react-toastify";
import { getData } from "../../../../redux/reducers/dataSlice";
import taskAPI from "../../../../ultils/fetchAPI/taskAPI";

const useStyles = createUseStyles({
  editTask__container: {
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
    color: "#FFFFFF",
    zIndex: "11",
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditTask({
  task,
  listCollections,
  handleChangeData,
  handleCloseActionsBar,
}) {
  const classes = useStyles();

  const [listSelections, setListSelections] = useState(() => {
    if (task) {
      let a = task?.categories?.map((category) => {
        return category.id;
      });
      return a;
    } else {
      return [];
    }
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
  const onSubmit = async (data) => {
    let title = data.title;
    let categoryIds = listSelections;
    let status = "IN_PROGRESS";
    let taskDetails = { title, categoryIds, status };
    try {
      await taskAPI().updateTask(task.id, taskDetails);
      handleChangeData(getData());

      toast.success("🦄 Update Task Successful!");
      handleClose();
      handleCloseActionsBar();
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  return (
    <div>
      <div
        className={clsx(
          "button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
        )}
        onClick={handleOpen}
      >
        edit task
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
          },
        }}
      >
        <div className={clsx(classes.editTask__container)}>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="editTask__top d-flex w-100">
              <div className={clsx(classes.editTask__caption, "mr-auto")}>
                Edit Task
              </div>
              <div className="editTask__close-btn" onClick={handleClose}>
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
                defaultValue={task.title}
                autoComplete="title"
                {...register("title", {
                  required: "This is required.",
                  minLength: {
                    value: 6,
                    message: "Min length is 6",
                  },
                })}
              />
              {Object.keys(errors).length !== 0 && (
                <div className={clsx(classes.editTask__err)}>
                  *{errors.title?.message}
                </div>
              )}
            </div>

            <div className={clsx(classes.editTask__group, "bar-listColl")}>
              <div className={clsx(classes.editTask__title)}>
                List Collection
              </div>
              <div className={clsx(classes.editTask__listColls)}>
                {listCollections?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={clsx(classes.editTask__itemColl)}
                    >
                      <input
                        type="checkbox"
                        className={clsx(classes.editTask__checkbox)}
                        checked={
                          listSelections?.find((id) => id === item.id) || ""
                        }
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
