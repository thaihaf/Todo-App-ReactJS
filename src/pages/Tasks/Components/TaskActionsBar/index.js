import React from "react";
import { lazy } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { dataSelector } from "../../../../redux/selectors";
import "./style.css";
import { useState } from "react";

// Component
const SearchTasks = lazy(() => import("../actions/SearchTasks"));

export default function TaskActionsBar({
  toggleAddBar,
  handleRemoveTasks,
  handleChangeData,
}) {
  const [displaySearchBarVal, setDisplaySearchBarVal] = useState(false);
  const toggleSearchBar = (value) => (event) => {
    setDisplaySearchBarVal(value);
  };

  const data = useSelector(dataSelector);

  return (
    <div className={clsx("taskBar__container")}>
      <div className={clsx("taskBar__details")}>
        <div className={clsx("taskBar__detail")}>
          Total : {data && data.meta ? data.meta.totalItems : 0}
        </div>
      </div>

      <div className={clsx("taskBar__actions")}>
        <div className={clsx("taskBar__group", "taskBar__group_search")}>
          <SearchTasks
            displayVal={displaySearchBarVal}
            handleChangeData={handleChangeData}
          />
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

        <div className={clsx("taskBar__group")}>
          <button
            className={clsx(
              "taskBar__action",
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
              "taskBar__action",
              "button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
            )}
            onClick={handleRemoveTasks}
          >
            <ion-icon name="trash"></ion-icon>
          </button>
        </div>
      </div>
    </div>
  );
}
