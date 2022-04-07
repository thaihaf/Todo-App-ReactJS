import { createUseStyles } from "react-jss";
import { useState, useRef } from "react";
import clsx from "clsx";
import { toast } from "react-toastify";

import { searchTasks } from "../../../../redux/reducers/dataSlice";

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

export default function SearchTasks({ displayVal, handleChangeData }) {
  const classes = useStyles();

  const [searchVal, setSearchVal] = useState("");
  const typeingTimeoutRef = useRef(null);

  const handleSearch = (value) => {
    if (typeingTimeoutRef.current) {
      clearTimeout(typeingTimeoutRef.current);
    }

    typeingTimeoutRef.current = setTimeout(async () => {
      try {
        handleChangeData(searchTasks(value), "search");
      } catch (error) {
        let errForm = error.message;
        toast.error(errForm);
      }
    }, 1000);
  };

  const handleClearInput = () => {
    handleSearch("");
    setSearchVal("");
  };

  const handleChange = (e) => {
    handleSearch(e.target.value);
    setSearchVal(e.target.value);
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
          value={searchVal}
          onChange={handleChange}
          autoFocus={true}
        />
      </div>

      {searchVal !== "" && (
        <div className="searchTasks__button" onClick={handleClearInput}>
          <ion-icon
            name="close-outline"
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          ></ion-icon>
        </div>
      )}
    </div>
  );
}
