// lib
import { createUseStyles } from "react-jss";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { lazy } from "react";
import "./style.css"

// Component

import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/reducers/categoriesSlice";
import { categoriesSelector } from "../../redux/selectors";

const Collection = lazy(() => import("../../components/Category"));
const AddCollection = lazy(() => import("./Components/actions/AddCollection"));

const useStyles = createUseStyles({
  Home:{
    maxWidth: "100rem",
    margin : "auto"
  },
  content: {
    maxWidth: "80%",
  },
  home__title: {
    fontSize: "3rem",
    fontWeight: "bold",
    margin: "2rem 0",
  },
  home__collections: {
    width: "100%",
    display: "grid",
    gap: "1.7rem",
    transition: "all 0.3s linear",
  },
  home__actions: {
    gap: "1rem",
  },
  home__action: {
    padding: "1.2rem 2.4rem !important",
    margin: "auto",
    borderRadius: "1.5rem",
  },
});

export default function Home() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const collections = useSelector(categoriesSelector);
  const [haveCollection, setHaveCollection] = useState(false);
  const [addCollDisplayVal, setAddCollDisplayVal] = useState(false);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  useEffect(() => {
    collections && collections.length > 0
      ? setHaveCollection(true)
      : setHaveCollection(false);
  }, [collections]);

  const toggleAddCollDisplayVal = (value) => (event) => {
    setAddCollDisplayVal(value);
  };

  return (
    <div className={clsx(classes.Home)}>
      <div className={clsx("content", classes.content)}>
        <div
          className={clsx(
            classes.topBar,
            "topBar",
            "w-100",
            haveCollection ? "d-flex" : "",
            "align-items-center",
            "justify-content-between"
          )}
        >
          <div
            className={clsx(
              classes.home__title,
              !haveCollection ? "w-100" : "", "home__title"
            )}
          >
            {haveCollection ? "Collections" : "You have no collections."}
          </div>

          <div
            className={clsx(
              classes.home__actions,
              haveCollection ? "d-flex" : "w-100"
            )}
          >
            <button
              className={clsx(
                classes.home__action,
                "home__action",
                !haveCollection ? "d-none" : "",
                "searchCollection button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
              )}
            >
              <ion-icon name="search-outline"></ion-icon>
            </button>

            <button
              className={clsx(
                classes.home__action,
                "home__action",
                "addCollection button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
              )}
              onClick={toggleAddCollDisplayVal(true)}
            >
              <ion-icon name="add-outline"></ion-icon>
              {haveCollection ? "" : "Add Your First Collection"}
            </button>
          </div>
        </div>

        <div
          className={clsx(classes.home__collections, "home__collections")}
          style={{
            gridTemplateColumns: `repeat(${haveCollection ? "2" : "1"},1fr)`,
          }}
        >
          {haveCollection &&
            collections &&
            collections.map((collection) => {
              return <Collection key={collection.id} collection={collection} />;
            })}
        </div>
      </div>

      <AddCollection
        toggleFunc={toggleAddCollDisplayVal}
        displayVal={addCollDisplayVal}
      />
    </div>
  );
}
