import React from "react";
// lib
import { useState, useEffect, useCallback } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/reducers/dataSlice";
import { categoriesSelector, dataSelector } from "../../redux/selectors";
import { toast } from "react-toastify";

// Component
import Task from "../../components/Task";
import Paging from "../../components/Paging";
import TaskActionsBar from "./TaskActionsBar";
import { getCategories } from "../../redux/reducers/categoriesSlice";
import CreateTask from "../../components/Task/Components/CreateTask";

// Service
const useStyles = createUseStyles({
  content: {
    textAlign: "left",
    maxWidth: "unset",
  },
  tasks: {
    width: "80%",
    maxWidth: "100rem",
    marginBottom: "3rem",
    display: "grid",
    gap: "1.7rem",
    gridTemplateColumns: "repeat(auto-fit, minmax(25rem, 1fr))",
    transition: "all 0.3s linear",
  },
  taskBar__container: {
    textTransform: "capitalize",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "2rem",
    width: "80%",
    maxWidth: "100rem",
  },
  taskBar__actions: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
  },
  taskBar__action: {
    height: "100%",
    padding: "0.8rem 2rem !important",
    marginBottom: "0",
    borderRadius: "1.5rem",
    position: "relative",
  },

  taskBar__input: {
    minWidth: "5rem",
    padding: "1rem",
    width: "3rem !important",
    fontSize: "1.5rem",
  },
  taskBar__detail: {
    fontSize: "2rem",
    fontWeight: "700",
  },
  taskBar__lable: {
    fontSize: "1.5rem",
  },
  taskBar__message: {
    textAlign: "center",
  },
});

export default function ListTasks() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const data = useSelector(dataSelector);
  const listCollections = useSelector(categoriesSelector);
  const [typeData, setTypeData] = useState("");
  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleChangeData = (data, type) => {
    type && type === "search" ? setTypeData(type) : setTypeData("");
    dispatch(data);
  };

  const handleSelectTasks = (id, checked) => {
    let existing = selectedTasks.includes(id);

    if (existing && !checked) {
      const newArr = selectedTasks.filter((select) => select !== id);
      setSelectedTasks(newArr);
    } else if (!existing && checked) {
      setSelectedTasks([...selectedTasks, id]);
    }
  };

  useEffect(() => {
    handleChangeData(getData());
    dispatch(getCategories());
  }, []);

  if (data && !listCollections) {
    toast.error("Network check failed, Wait 3 sencond to reload windown");

    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
  return (
    <div className="ViewCollection">
      <div className={clsx(classes.content, "content")}>
        <TaskActionsBar
          listCollections={listCollections}
          handleChangeData={handleChangeData}
        />

        {data?.meta?.totalItems === 0 &&
          (typeData === "search" ? (
            <div
              className={clsx(classes.taskBar__message)}
              style={{
                fontSize: "1.5rem",
                marginTop: "3rem",
              }}
            >
              No has any Task match with Search Value
            </div>
          ) : (
            <CreateTask
              listCollections={listCollections}
              handleChangeData={handleChangeData}
            >
              Add First Task
            </CreateTask>
          ))}

        <div className={clsx(classes.tasks)}>
          {data?.items?.map((task) => {
            return (
              <Task
                key={task.id}
                task={task}
                listCollections={listCollections}
                handleChangeData={handleChangeData}
                handleSelectTasks={handleSelectTasks}
              />
            );
          })}
        </div>

        {data?.meta?.totalItems > 0 && (
          <Paging data={data} handleChangeData={handleChangeData} />
        )}
      </div>
    </div>
  );
}
