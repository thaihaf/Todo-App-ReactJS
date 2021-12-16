// lib
import { createUseStyles } from "react-jss";
import { useState, useEffect } from "react";
import clsx from "clsx";

// Component
import Collection from "./Collection";
import AddCollection from "../actions/addCollection/AddCollection";

import collectionAPI from "../../../../service/fetchAPI/collectionsAPI";

const useStyles = createUseStyles({
  home__title: {
    fontSize: "3rem",
    fontWeight: "bold",
    margin: "2rem 0",
  },
  home__collections: {
    width: "100%",
    display: "grid",
    gap: "1.7rem",
    transition: "all 0.3s ease",
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
  const [collections, setCollections] = useState([]);
  const [addCollDisplayVal, setAddCollDisplayVal] = useState(false);

  useEffect(async () => {
    const res = await collectionAPI().getCollections(`api/categories?limit=8`);
    setCollections(res.items);
  }, []);

  const toggleAddCollDisplayVal = (value) => (event) => {
    setAddCollDisplayVal(value);
  };

  return (
    <div className="Home">
      <div
        className="content"
        style={{
          minWidth: `${collections.length > 0 ? `70rem` : `40rem`}`,
        }}
      >
        <div
          className={clsx(
            classes.topBar,
            "w-100",
            collections.length > 0 ? "d-flex" : "",
            "align-items-center",
            "justify-content-between"
          )}
        >
          <div
            className={clsx(
              classes.home__title,
              collections.length == 0 ? "w-100" : ""
            )}
          >
            {collections.length > 0
              ? "Collections"
              : "You have no collections."}
          </div>

          <div
            className={clsx(
              classes.home__actions,
              collections.length > 0 ? "d-flex" : "w-100"
            )}
          >
            <button
              className={clsx(
                classes.home__action,
                collections.length == 0 ? "d-none" : "",
                "searchCollection button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
              )}
            >
              <ion-icon name="search-outline"></ion-icon>
            </button>

            <button
              className={clsx(
                classes.home__action,
                "addCollection button btn--flex btn--bg-gray btn--border btn--hover-bg-gray"
              )}
              onClick={toggleAddCollDisplayVal(true)}
            >
              <ion-icon name="add-outline"></ion-icon>
              {collections.length > 0 ? "" : "Add Your First Collection"}
            </button>
          </div>
        </div>

        <div
          className={classes.home__collections}
          style={{
            gridTemplateColumns: `repeat(${
              collections.length > 0 ? "2" : "1"
            },1fr)`,
          }}
        >
          {collections.length > 0 &&
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
