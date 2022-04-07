import React from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { dataSelector } from "../../../redux/selectors";
import "./style.css";
import { useState } from "react";

// Component
import CreateTask from "../../../components/Task/Components/CreateTask";
import SearchTasks from "../../../components/Task/Components/SearchTasks";

const TaskActionsBar = ({
  listCollections,
  handleChangeData,
}) => {
  const [displaySearchBarVal, setDisplaySearchBarVal] = useState(false);
  const toggleSearchBar = (value) => (event) => {
    setDisplaySearchBarVal(value);
  };

  const data = useSelector(dataSelector);

  return (
    <div className={clsx("taskBar__container")}>
      <div className={clsx("taskBar__group")}>
        <div className={clsx("taskBar__details")}>
          <div className={clsx("taskBar__detail")}>
            Total : {data && data.meta ? data.meta.totalItems : 0}
          </div>
        </div>

        <CreateTask
          listCollections={listCollections}
          handleChangeData={handleChangeData}
        >
          <div className="taskAction__icon">
            <ion-icon name="add"></ion-icon>
          </div>
        </CreateTask>

        <button
          className={clsx(
            "taskBar__action",
            "taskBar__action_search",
            "button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
          )}
          onClick={toggleSearchBar(!displaySearchBarVal)}
        >
          <div className="taskAction__icon">
            <ion-icon name="search"></ion-icon>
          </div>
        </button>
      </div>

      {displaySearchBarVal && (
        <div className={clsx("taskBar__group", "taskBar__group_search")}>
          <SearchTasks
            displayVal={displaySearchBarVal}
            handleChangeData={handleChangeData}
          />
        </div>
      )}
    </div>
  );
};

export default TaskActionsBar;
