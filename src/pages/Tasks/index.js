// lib
import { useState, useEffect, lazy } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { getData } from "../../redux/slice/dataSlice";
import { categoriesSelector, dataSelector } from "../../redux/selectors";
import { toast } from "react-toastify";

// Component
const Task = lazy(() => import("../../components/Task"));
const Paging = lazy(() => import("../../components/Paging"));
const CreateTask = lazy(() => import("./Components/actions/CreateTask"));
const DeleteTask = lazy(() => import("./Components/actions/DeleteTask"));
const TaskActionsBar = lazy(() => import("./Components/TaskActionsBar"));

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

const useActions = () => {
  const [displayAddBarVal, setDisplayAddBarVal] = useState(false);

  const [displayDeleteBarVal, setDisplayDeleteBarVal] = useState(false);

  const toggleAddBar = (value) => (event) => {
    setDisplayAddBarVal(value);
  };

  const toggleDeleteBar = (value) => (event) => {
    setDisplayDeleteBarVal(value);
  };
  return {
    toggleAddBar,
    toggleDeleteBar,
    displayAddBarVal,
    displayDeleteBarVal,
  };
};

export default function ListTasks() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    toggleAddBar,
    toggleDeleteBar,
    displayAddBarVal,
    displayDeleteBarVal,
  } = useActions();

  const data = useSelector(dataSelector);
  const listCollections = useSelector(categoriesSelector);
  const [typeData, setTypeData] = useState("");

  const handleChangeData = (data, type) => {
    type && type === "search" ? setTypeData(type) : setTypeData("");
    dispatch(data);
  };

  useEffect(() => {
    handleChangeData(getData());
  }, []);

  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleSelectTasks = (id, checked) => {
    let existing = selectedTasks.includes(id);

    if (existing && !checked) {
      const newArr = selectedTasks.filter((select) => select !== id);
      setSelectedTasks(newArr);
    } else if (!existing && checked) {
      setSelectedTasks([...selectedTasks, id]);
    }
  };
  const handleRemoveTasks = (event) => {
    if (selectedTasks.length === 0) {
      toast.warn("Not select yet");
    } else {
      toggleDeleteBar(!displayDeleteBarVal)();
    }
  };

  return (
    <div className="ViewCollection">
      <div className={clsx(classes.content, "content")}>
        <TaskActionsBar
          toggleAddBar={toggleAddBar}
          handleRemoveTasks={handleRemoveTasks}
          handleChangeData={handleChangeData}
        />

        {data &&
          data.meta &&
          data.meta.totalItems === 0 &&
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
            <button
              className={clsx(
                classes.taskBar__action,
                "button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
              )}
              onClick={toggleAddBar(true)}
            >
              <div className="taskAction__icon">
                <ion-icon name="add"></ion-icon>
              </div>
              <div className="taskAction__text">Add First Task</div>
            </button>
          ))}

        <div className={clsx(classes.tasks)}>
          {data &&
            data.meta &&
            data.meta.totalItems > 0 &&
            data.items.map((task) => {
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

        {data && data.meta && data.meta.totalItems > 0 && (
          <Paging data={data} handleChangeData={handleChangeData} />
        )}

        <CreateTask
          displayVal={displayAddBarVal}
          toggleFunc={toggleAddBar}
          listCollections={listCollections}
          handleChangeData={handleChangeData}
        />

        <DeleteTask
          taskIDs={selectedTasks}
          displayVal={displayDeleteBarVal}
          toggleFunc={toggleDeleteBar}
          handleChangeData={handleChangeData}
        />
      </div>
    </div>
  );
}
