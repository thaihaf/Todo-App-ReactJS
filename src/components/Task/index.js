import React, { memo } from "react";
import { useState } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

import EditTask from "./Components/EditTask";
import DeleteTask from "./Components/DeleteTask";
import { Menu } from "@mui/material";

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
    borderBottom: "2px solid var(--bg-btn-pink)",
  },
  task__title: {
    width: "100%",
    fontSize: "1.6rem",
    flexGrow: "1",
    padding: "0 1rem 1rem",
    wordBreak: "break-word",
  },

  task__top: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
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
    margin: "1rem",
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

function Task({ listCollections, task, handleChangeData, handleSelectTasks }) {
  const classes = useStyles();

  const [checkboxSelected, setCheckboxSelected] = useState(false);
  const handleSelectionChange = (id) => (e) => {
    let checked = e.target.checked;
    setCheckboxSelected(checked);
    handleSelectTasks(id, checked);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openActionsBar = Boolean(anchorEl);
  const handleOpenActionsBar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseActionsBar = () => {
    setAnchorEl(null);
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

          <div className="actions_bar">
            <ion-icon
              name="ellipsis-vertical"
              style={{
                fontSize: "2rem",
                marginLeft: "auto",
                padding: "1rem",
              }}
              onClick={handleOpenActionsBar}
            ></ion-icon>

            <Menu
              id="demo-positioned-menu"
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={openActionsBar}
              onClose={handleCloseActionsBar}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              PaperProps={{
                style: {
                  backgroundColor: "#1e1e29",
                  padding: "0",
                  border: "2px solid var(--bg-btn-pink)",
                  borderTopRightRadius: "0",
                  borderTopLeftRadius: "0",
                  borderBottomRightRadius: "1.1rem",
                  borderBottomLeftRadius: "1.1rem",
                  zIndex: "2",
                },
              }}
            >
              <EditTask
                task={task}
                listCollections={listCollections}
                handleChangeData={handleChangeData}
                handleCloseActionsBar={handleCloseActionsBar}
              />
              <DeleteTask
                task={task}
                handleChangeData={handleChangeData}
                handleCloseActionsBar={handleCloseActionsBar}
              />
            </Menu>
          </div>
        </div>
      </div>

      <div className={clsx(classes.task__title)}>{task.title}</div>
    </div>
  );
}

export default memo(Task);
