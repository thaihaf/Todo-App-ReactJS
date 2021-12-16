import React from "react";
import clsx from "clsx";
import { createUseStyles } from "react-jss";
import { useState } from "react";
import { toast } from "react-toastify";

import taskAPI from "../../service/fetchAPI/taskAPI";

const useStyles = createUseStyles({
  paging__list: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.7rem",
  },
  paging__item: {
    width: "4.2rem",
    height: "4rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    borderRadius: "1rem",
    outline: "none !important",
    border: "none",
    color: "var(--bg-btn-pink)",
    backgroundColor: "var(--background-color-header)",
  },
  paging__chevron: {
    margin: "0 1rem",
    color: "var(--bg-btn-pink)",
  },
  paging__input: {
    width: "4.2rem ",
    height: "4rem ",
    padding: "0 1.5rem",
    fontSize: "1.5rem",
  },
  paging__item_disabled: {
    color: "#999",
    cursor: "default !important",
  },
  paging__icon_disabled: {
    cursor: "default !important",
  },
  paging__item_active: {
    border: "2px solid var(--bg-btn-pink)",
  },
});

export default function Paging({ data, handleChangeData }) {
  const classes = useStyles();

  let [currentPage, setCurrentPage] = useState(data.meta.currentPage);

  const handleChange = async (link) => {
    try {
      handleChangeData(
        await taskAPI().getTasks(link.substring(link.lastIndexOf("/api")))
      );
    } catch (error) {
      let errForm = error.message;
      toast.error(errForm);
    }
  };

  const previousBtn = (link) => async () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      handleChange(link);
    }
  };
  const nextBtn = (link) => async () => {
    if (currentPage < data.meta.totalPages) {
      setCurrentPage(currentPage + 1);

      handleChange(link);
    }
  };
  const numberBtn = (link, val) => async (e) => {
    setCurrentPage(val);
    handleChange(link);
  };
  const input = (e) => {
    let value = e.target.value
  }

  return (
    <div className={clsx(classes.paging__list)}>
      <button
        className={clsx(
          classes.paging__item,
          classes.paging__chevron,
          data.links.previous == null && classes.paging__item_disabled,
        )}
        onClick={previousBtn(data.links.previous)}
        disabled={data.links.previous == null && true}
      >
        <ion-icon
          name="chevron-back"
          className={clsx(classes.paging__icon_disabled)}
        ></ion-icon>
      </button>

      <button
        className={clsx(
          classes.paging__item,
          currentPage == 1 ? classes.paging__item_active : ""
        )}
        onClick={numberBtn(data.links.first, 1)}
      >
        1
      </button>

      {currentPage > 1 && currentPage < data.meta.totalPages ? (
        <input
          type="text"
          className={clsx(classes.paging__input, classes.paging__item_active, data.meta.totalPages == 1 && "d-none")}
          value={currentPage}
          readOnly={true}
        />
      ) : (
        <button
          className={clsx(classes.paging__item, data.meta.totalPages == 1 && "d-none")}
        >
          ...
        </button>
      )}

      <button
        className={clsx(
          classes.paging__item,
          currentPage == data.meta.totalPages ? classes.paging__item_active : "",
          data.meta.totalPages == 1 && "d-none"
        )}
        onClick={numberBtn(data.links.last, data.meta.totalPages)}
      >
        {data.meta ? data.meta.totalPages : ""}
      </button>

      <button
        className={clsx(
          classes.paging__item,
          classes.paging__chevron,
          data.links.next == null && classes.paging__item_disabled,
        )}
        onClick={nextBtn(data.links.next)}
        disabled={data.links.next == null && true}
      >
        <ion-icon name="chevron-forward"></ion-icon>
      </button>
    </div>
  );
}
