import React, { memo } from "react";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

import EditTask from "../../pages/Tasks/Components/actions/EditTask";
import DeleteTask from "../../pages/Tasks/Components/actions/DeleteTask";
import SubmitTask from "../../pages/Tasks/Components/actions/SubmitTask";

const useStyles = createUseStyles({
  task__bar: {
    borderRadius: "1.3rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    position: "relative",
    minHeight: "15rem",
    transition: "all 0.2s linear",
  },
  task__btns: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    padding: "1rem",
    borderBottom: "2px solid var(--bg-btn-pink)",
  },
  collection__actions: {
    minWidth: "max-content",
    top: "101%",
    right: "4%",
    borderBottomRightRadius: "1.1rem",
    borderBottomLeftRadius: "1.1rem",
    backgroundColor: "#1e1e29",
    zIndex: "2",
    border: "2px solid var(--bg-btn-pink)",
    position: "absolute",
  },
  collection__action: {
    fontSize: "1.3rem",
    padding: "1.2rem 1.8rem",
  },
  task__title: {
    width: "100%",
    fontSize: "1.6rem",
    flexGrow: "1",
    padding: "0 1rem 1rem",
  },
  task__top: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  task__checkbox: {
    position: "relative",
    width: "2rem",
    height: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.3rem",
    border: "2px solid var(--bg-btn-pink)",
  },
  task__input: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: "0",
  },
  task__selectIcon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "2rem",
    borderRadius: "0.3rem",
    backgroundColor: "var(--bg-btn-pink)",
  },
});

const useActions = () => {
  const [editTaskDisplayVal, setEditTaskDisplayVal] = useState(false);
  const [deleteTaskDisplayVal, setDeleteTaskDisplayVal] = useState(false);
  const [submitTaskDisplayVal, setSubmitTaskDisplayVal] = useState(false);

  // start - Taskection
  const toggleEditTaskDisplayVal = (value) => (event) => {
    setEditTaskDisplayVal(value);
  };
  const toggleDeleteTaskDisplayVal = (value) => (event) => {
    setDeleteTaskDisplayVal(value);
  };
  const toggleSubmitTaskDisplayVal = (value) => (event) => {
    setSubmitTaskDisplayVal(value);
  };

  return {
    toggleEditTaskDisplayVal,
    toggleDeleteTaskDisplayVal,
    toggleSubmitTaskDisplayVal,
    editTaskDisplayVal,
    deleteTaskDisplayVal,
    submitTaskDisplayVal,
  };
};

function Task({ listCollections, task, handleChangeData, handleSelectTasks }) {
  const classes = useStyles();
  const {
    toggleEditTaskDisplayVal,
    toggleDeleteTaskDisplayVal,
    toggleSubmitTaskDisplayVal,
    editTaskDisplayVal,
    deleteTaskDisplayVal,
    submitTaskDisplayVal,
  } = useActions();

  const [displayActionsBarVal, setDisplayActionsBarVal] = useState(false);
  const toggelActionsBar = (e) => {
    setDisplayActionsBarVal(!displayActionsBarVal);
  };

  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const handleSelectionChange = (id) => (e) => {
    let checked = e.target.checked;
    setCheckboxSelected(checked);
    handleSelectTasks(id, checked);
  };

  return (
    <div
      className={clsx(classes.task__bar)}
      style={{
        border: checkboxSelected
          ? `3px solid var(--bg-btn-pink)`
          : "3px solid var(--bg-btn-gray)",
        backgroundColor: "var(--background-color-header)",
      }}
    >
      <div className={clsx(classes.task__btns)}>
        <div className={clsx(classes.task__top)}>
          <div className={clsx(classes.task__checkbox)}>
            {checkboxSelected && (
              <div className={clsx(classes.task__selectIcon)}>
                <ion-icon name="checkmark"></ion-icon>
              </div>
            )}
            <input
              type="checkbox"
              className={clsx(classes.task__input)}
              onChange={handleSelectionChange(task.id)}
            />
          </div>
          <ion-icon
            name="ellipsis-vertical"
            style={{ fontSize: "2rem", marginLeft: "auto" }}
            onClick={toggelActionsBar}
          ></ion-icon>
        </div>

        <div
          className={clsx(
            classes.collection__actions,
            !displayActionsBarVal && "d-none"
          )}
        >
          <div
            className={clsx(
              classes.collection__action,
              " button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
            )}
            onClick={toggleSubmitTaskDisplayVal(true)}
          >
            Submit Task
          </div>
          <div
            className={clsx(
              classes.collection__action,
              " button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
            )}
            onClick={toggleEditTaskDisplayVal(true)}
          >
            edit task
          </div>
          <div
            className={clsx(
              classes.collection__action,
              " button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
            )}
            onClick={toggleDeleteTaskDisplayVal(true)}
          >
            delete task
          </div>
        </div>
      </div>

      <div className={clsx(classes.task__title)}>{task.title}</div>

      <EditTask
        task={task}
        listCollections={listCollections}
        displayVal={editTaskDisplayVal}
        toggleFunc={toggleEditTaskDisplayVal}
        handleChangeData={handleChangeData}
      />
      <SubmitTask
        task={task}
        displayVal={submitTaskDisplayVal}
        toggleFunc={toggleSubmitTaskDisplayVal}
        handleChangeData={handleChangeData}
      />
      <DeleteTask
        taskIDs={task.id}
        displayVal={deleteTaskDisplayVal}
        toggleFunc={toggleDeleteTaskDisplayVal}
        handleChangeData={handleChangeData}
      />
    </div>
  );
}

export default memo(Task);
