import { createUseStyles } from "react-jss";
import { useState, useRef } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";

import taskAPI from "../../../../../service/fetchAPI/taskAPI";

const useStyles = createUseStyles({
  searchTasks__bar: {
    display: "flex",
    top: "150%",
    right: "0",
    width: "30rem",
    paddingRight: "1.3rem",
    borderRadius: "1.3rem",
    border: "2.2px solid var(--bg-btn-pink)",
    alignItems: "center",
    opacity: "1",
    transition: "all 0.2s linear !important",
  },
  searchTasks__bar_hidden: {
    opacity: "0",
    visibility: "hidden",
  },
  searchTasks__button: {
    padding: "0.3rem",
    borderRadius: "0.7rem",
    display: "flex",
  },
  searchTasks__input: {
    fontSize: "1.6rem",
    padding: "0.8rem 2rem",
  },
});

export default function SearchTask({
  displayVal,
  // inputRef,
  listTasks,
  handleChangeData,
}) {
  const classes = useStyles();

  const [searchVal, setSearchVal] = useState("");
  const typeingTimeoutRef = useRef(null);

  const searchTasks = async () => {};

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchVal(value);

    if (typeingTimeoutRef.current) {
      clearTimeout(typeingTimeoutRef.current);
    }

    typeingTimeoutRef.current = setTimeout(async () => {
      try {
        // const filteredTasks = await listTasks.filter((task) =>
        //   task.title.includes(searchVal)
        // );
        // handleChangeData(filteredTasks, "search");
        const res = await taskAPI().getTasks(
          `api/tasks?limit=6&page=1&search=${value}`
        );
        handleChangeData(res, "search");
      } catch (error) {
        let errForm = error.message;
        toast.error(errForm);
      }
    }, 700);
  };

  return (
    <div
      className={clsx(
        classes.searchTasks__bar,
        !displayVal && classes.searchTasks__bar_hidden
      )}
    >
      <div className="searchTasks__input w-100">
        <input
          type="text"
          placeholder="Input tasks name"
          className={clsx(
            classes.searchTasks__input,
            "w-100 input--none-border"
          )}
          // ref={inputRef}
          value={searchVal}
          onChange={handleChange}
          autoFocus={true}
        />
      </div>

      <div className="searchTasks__button" onClick={searchTasks}>
        <ion-icon
          name="search"
          style={{
            fontSize: "2rem",
            cursor: "pointer",
          }}
        ></ion-icon>
      </div>
    </div>
  );
}
