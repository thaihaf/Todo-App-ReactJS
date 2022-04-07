// lib
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import clsx from "clsx";

// Component
import AddTask from "../../task/actions/createTask/CreateTask";
import SearchTasks from "../../task/actions/searchTasks/SearchTasks";

import EditCollection from "../actions/EditCollection";
import DeleteCollection from "../actions/DeleteCollection";

// Service

const useStyles = createUseStyles({
  collection__bar: {
    maxWidth: "70rem",
    width: "80%",
  },
  collection__backBtn: {
    padding: "1.2rem",
    marginRight: "1.5rem",
    borderRadius: "1.5rem",
    backgroundColor: "var(--background-color-header)",
    cursor: "pointer",
  },
  collection__name: {
    fontSize: "3rem",
    textTransform: "capitalize",
  },
  taskActions: {
    gap: "1rem",
    marginRight: "1rem",
  },
  taskAction: {
    marginRight: "1rem",
    position: "relative",
  },
  collection__dots: {
    cursor: "pointer",
    position: "relative",
  },
  collection__actions: {
    minWidth: "max-content",
    right: "0",
    top: "150%",
    borderRadius: "1.1rem",
    backgroundColor: "#1e1e29",
    zIndex: "2",
    position: "absolute",
    border: "3px solid var(--bg-btn-pink)",
  },
  collection__action: {
    padding: "1.5rem 3.2rem",
    fontSize: "1.45rem",
  },
});

const useActions = () => {
  const [displayCollectionActionsBarVal, setDisplayCollectionActionsBarVal] =
    useState(false);
  const [displayAddBarVal, setDisplayAddBarVal] = useState(false);
  const [displaySearchBarVal, setDisplaySearchBarVal] = useState(false);

  const [editCollDisplayVal, setEditCollDisplayVal] = useState(false);
  const [deleteCollDisplayVal, setDeleteCollDisplayVal] = useState(false);

  // start - collection
  const toggleEditCollDisplayVal = (value) => (event) => {
    setEditCollDisplayVal(value);
  };
  const toggleDeleteCollDisplayVal = (value) => (event) => {
    setDeleteCollDisplayVal(value);
  };

  const toggleAddBar = () => {
    setDisplayAddBarVal(!displayAddBarVal);
    setDisplaySearchBarVal(false);
    setDisplayCollectionActionsBarVal(false);
  };
  const toggleSearchBar = () => {
    setDisplaySearchBarVal(!displaySearchBarVal);
    setDisplayAddBarVal(false);
    setDisplayCollectionActionsBarVal(false);
  };
  const toggleCollectionActionsBar = () => {
    setDisplayCollectionActionsBarVal(!displayCollectionActionsBarVal);
    setDisplayAddBarVal(false);
    setDisplaySearchBarVal(false);
  };

  return {
    toggleEditCollDisplayVal,
    toggleDeleteCollDisplayVal,
    editCollDisplayVal,
    deleteCollDisplayVal,
    toggleAddBar,
    toggleSearchBar,
    toggleCollectionActionsBar,
    displayCollectionActionsBarVal,
    displayAddBarVal,
    displaySearchBarVal,
  };
};

export default function CollectionBar({ collection, handleChangeData }) {
  const navigate = useNavigate();
  const classes = useStyles();

  const {
    toggleEditCollDisplayVal,
    toggleDeleteCollDisplayVal,
    editCollDisplayVal,
    deleteCollDisplayVal,
    toggleAddBar,
    toggleSearchBar,
    toggleCollectionActionsBar,
    displayCollectionActionsBarVal,
    displayAddBarVal,
    displaySearchBarVal,
  } = useActions();

  return (
    <div
      className={clsx(
        classes.collection__bar,
        "collection__bar d-flex align-items-center"
      )}
    >
      <Link className={clsx(classes.collection__backBtn)} to="/collections">
        <ion-icon name="chevron-back-outline"></ion-icon>
      </Link>

      <div className={clsx(classes.collection__name, "mr-auto")}>
        {collection.name}
      </div>

      <div className={clsx(classes.taskActions, "d-flex align-items-center")}>
        <div className={clsx(classes.taskAction)}>
          <div className="taskAction__icon" onClick={toggleAddBar}>
            <ion-icon name="add"></ion-icon>
          </div>
          {displayAddBarVal && (
            <AddTask collection={collection} handleChangeData={handleChangeData} />
          )}
        </div>

        <div className={clsx(classes.taskAction)}>
          <div className="taskAction__icon" onClick={toggleSearchBar}>
            <ion-icon name="search"></ion-icon>
          </div>
          {displaySearchBarVal && (
            <SearchTasks collection={collection} handleChangeData={handleChangeData} />
          )}
        </div>
      </div>

      <div className={clsx(classes.collection__dots)}>
        <ion-icon
          name="ellipsis-horizontal"
          onClick={toggleCollectionActionsBar}
        ></ion-icon>

        <div
          className={clsx(
            classes.collection__actions,
            !displayCollectionActionsBarVal && "d-none"
          )}
        >
          <div
            className={clsx(
              classes.collection__action,
              "button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
            )}
            onClick={toggleEditCollDisplayVal(true)}
          >
            edit collection
          </div>
          <div
            className={clsx(
              classes.collection__action,
              "button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
            )}
            onClick={toggleDeleteCollDisplayVal(true)}
          >
            delete collection
          </div>
        </div>
      </div>

      <EditCollection
        collection={collection}
        displayVal={editCollDisplayVal}
        toggleFunc={toggleEditCollDisplayVal}
      />
      <DeleteCollection
        collection={collection}
        displayVal={deleteCollDisplayVal}
        toggleFunc={toggleDeleteCollDisplayVal}
      />
    </div>
  );
}
