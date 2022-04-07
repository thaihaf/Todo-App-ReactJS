import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { useForm } from "react-hook-form";
import { forwardRef,  useState } from "react";
import { toast } from "react-toastify";

import taskAPI from "../../../../ultils/fetchAPI/taskAPI";
import { getData } from "../../../../redux/reducers/dataSlice";

const useStyles = createUseStyles({
  createTask__container: {
    padding: "2rem",
    backgroundColor: "#1D1D27",
    textAlign: "left",
    borderRadius: "1.6rem",
    color: "#FFFFFF",
    zIndex: "11",
  },
  createTask__caption: {
    fontSize: "2rem",
    textTransform: "capitalize",
    fontWeight: "bold",
    marginBottom: "2rem",
  },
  createTask__title: {
    fontSize: "1.6rem",
    textTransform: "capitalize",
    marginBottom: "1rem",
  },
  createTask__colors: {
    display: "grid",
    gap: "1.5rem",
    gridTemplateColumns: "repeat(auto-fit, 6rem)",
  },
  createTask__color: {
    width: "6rem",
    height: "5rem",
    backgroundColor: "transparent",
    cursor: "pointer",
    borderRadius: "1.2rem",
    position: "relative",
  },
  createTask__buttons: {
    gap: "1rem",
    marginTop: "5rem",
  },
  createTask__group: {
    marginBottom: "2rem",
    width: "100%",
  },
  createTask__err: {
    color: "red",
    padding: "1rem",
    fontSize: "1.4rem",
  },
  createTask__listColls: {
    height: "16rem",
    overflowY: "scroll",
    borderRadius: "1.2rem",
    border: "3px solid var(--background-color-header)",
  },
  createTask__itemColl: {
    display: "flex",
    alignItems: "center",
    padding: "1rem",
    borderBottom: "2px solid var(--background-color-header)",
    gap: "1rem",
    cursor: "pointer",
  },
  createTask__checkbox: {
    color: "var(--bg-btn-pink)",
    backgroundColor: "transparent",
    width: "1.7rem",
    height: "1.7rem",
  },
  createTask__lable: {
    fontSize: "1.6rem",
  },
});

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function CreateTask({
  children,
  listCollections,
  handleChangeData,
}) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [listSelections, setListSelections] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setValue("title", "");
    setListSelections([]);
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
    let taskDetails = { title, categoryIds };

    try {
      await taskAPI().createTask(taskDetails);

      handleClose();

      toast.success("🦄 Create Task Successful!");
      handleChangeData(getData());
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  return (
    <div>
      <button
        className={clsx(
          "taskBar__action",
          "button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
        )}
        onClick={handleOpen}
      >
        {children}
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
          },
        }}
      >
        <div className={clsx(classes.createTask__container)}>
          <form method="post" onSubmit={handleSubmit(onSubmit)}>
            <div className="createTask__top d-flex w-100">
              <div className={clsx(classes.createTask__caption, "mr-auto")}>
                create Task
              </div>
              <div className="createTask__close-btn" onClick={handleClose}>
                <ion-icon name="close"></ion-icon>
              </div>
            </div>

            <div className={clsx(classes.createTask__group, "bar-title")}>
              <div className={clsx(classes.createTask__title)}>Title</div>
              <input
                type="text"
                placeholder="My Task"
                className="btn--outline w-100 py-3"
                style={{ fontSize: "1.6rem" }}
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
                <div className={clsx(classes.createTask__err)}>
                  *{errors.title?.message}
                </div>
              )}
            </div>

            <div className={clsx(classes.createTask__group, "bar-listColl")}>
              <div className={clsx(classes.createTask__title)}>
                List Collection
              </div>
              <div className={clsx(classes.createTask__listColls)}>
                {listCollections?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={clsx(classes.createTask__itemColl)}
                    >
                      <input
                        type="checkbox"
                        className={clsx(classes.createTask__checkbox)}
                        checked={
                          listSelections?.find((id) => id === item.id) || ""
                        }
                        onChange={handleChangeOption(item.id)}
                      />
                      <span className={clsx(classes.createTask__lable)}>
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={clsx(classes.createTask__buttons, "w-100 d-flex")}>
              <button
                className="createTask__button button btn--none-border btn--hover-bg-gray-light ml-auto mb-0"
                style={{ backgroundColor: "#3D3C50" }}
                type="submit"
              >
                Submit
              </button>
              <button
                type="reset"
                className="createTask__button button btn--none-border btn--hover-bg-gray mb-0"
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
