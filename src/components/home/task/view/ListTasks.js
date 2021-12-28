// lib
import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import clsx from "clsx";
import { toast } from "react-toastify";

// Component
import Task from "./Task";
import Paging from "../../../Paging/Paging";
import CreateTask from "../actions/createTask/CreateTask";
import SearchTasks from "../actions/searchTasks/SearchTasks";
import DeleteTask from "../actions/deleteTask/DeleteTask";

// services
import taskAPI from "../../../../service/fetchAPI/taskAPI";
import collectionAPI from "../../../../service/fetchAPI/collectionsAPI";
import { useDispatch, useSelector } from "react-redux";
import { categoriesSelector, dataSelector } from "../../../../redux/selectors";
import { getData } from "../../../../redux/actions";

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
});

const useActions = () => {
  const [displayAddBarVal, setDisplayAddBarVal] = useState(false);
  const [displaySearchBarVal, setDisplaySearchBarVal] = useState(false);
  const [displayDeleteBarVal, setDisplayDeleteBarVal] = useState(false);

  // const inputSearchRef = useRef();

  const toggleAddBar = (value) => (event) => {
    setDisplayAddBarVal(value);
  };
  const toggleSearchBar = (value) => (event) => {
    // if (inputSearchRef.current) {
    //   inputSearchRef.current.focus();
    // }
    setDisplaySearchBarVal(value);
  };
  const toggleDeleteBar = (value) => (event) => {
    setDisplayDeleteBarVal(value);
  };
  return {
    toggleAddBar,
    toggleSearchBar,
    toggleDeleteBar,
    displayAddBarVal,
    displaySearchBarVal,
    displayDeleteBarVal,
    // inputSearchRef,
  };
};

export default function ListTasks() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const {
    toggleAddBar,
    toggleSearchBar,
    toggleDeleteBar,
    displayAddBarVal,
    displaySearchBarVal,
    displayDeleteBarVal,
    // inputSearchRef,
  } = useActions();

  const data = useSelector(dataSelector);
  const listCollections = useSelector(categoriesSelector);
  const [typeData, setTypeData] = useState("");

  useEffect(async () => {
    try {
      handleChangeData(await taskAPI().getTasks(`api/tasks?limit=6`));
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
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
    toggleDeleteBar(!displayDeleteBarVal)();
  };
  const handleChangeData = (data, type) => {
    type && type === "search" ? setTypeData(type) : setTypeData("");

    dispatch(getData(data));
  };

  return (
    <div className="ViewCollection">
      <div className={clsx(classes.content, "content")}>
        <div className={clsx(classes.taskBar__container)}>
          <div className={clsx(classes.taskBar__details)}>
            <div className={clsx(classes.taskBar__detail)}>
              Total : {data && data.meta ? data.meta.totalItems : 0}
            </div>
          </div>

          <div
            className={clsx(
              classes.taskBar__actions,
              "d-flex align-items-center"
            )}
          >
            <SearchTasks
              displayVal={displaySearchBarVal}
              // inputSearchRef={inputSearchRef}
              listTasks={data.items}
              handleChangeData={handleChangeData}
            />
            <button
              className={clsx(
                classes.taskBar__action,
                classes.taskBar__action_search,
                "button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
              )}
              onClick={toggleSearchBar(!displaySearchBarVal)}
            >
              <div className="taskAction__icon">
                <ion-icon name="search"></ion-icon>
              </div>
            </button>

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
            </button>

            <button
              className={clsx(
                classes.taskBar__action,
                "button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
              )}
              onClick={handleRemoveTasks}
            >
              <ion-icon name="trash"></ion-icon>
            </button>
          </div>
        </div>

        {data &&
          data.meta &&
          data.meta.totalItems == 0 &&
          (typeData == "search" ? (
            <div
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
