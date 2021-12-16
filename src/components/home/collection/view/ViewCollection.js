// lib
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUseStyles } from "react-jss";
import axios from "axios";
import clsx from "clsx";

// Component
import CollectionBar from "./CollectionBar";

import collectionAPI from "../../../../service/fetchAPI/collectionsAPI";
import taskAPI from "../../../../service/fetchAPI/collectionsAPI"

// Service

const useStyles = createUseStyles({
  content: {
    textAlign: "left",
    maxWidth: "unset",
  },
});

export default function ViewCollection() {
  const classes = useStyles();
  let { cId } = useParams();

  const [data, setData] = useState({});
  const [collection, setCollection] = useState({});
  const [listColl, setListColl] = useState([]);

  useEffect(() => {
    if (cId) {
      axios
        .get(`api/categories/${cId}`)
        .then((res) => {
          setCollection(res.data);
        })
        .catch((err) => {
          const errMsg = err.response.data.message;
          console.log(errMsg);
        });
    }
  }, []);

  useEffect(async () => {
    const tasksData = await taskAPI().getTasks(`api/tasks?limit=8`);
    handleChangeData(tasksData.data);
  }, []);

  useEffect(async () => {
    const res = await collectionAPI().getCollections(`api/categories?limit=8`)
    const items = res.data.items;
    console.log(items);
    setListColl(items)
  }, []);

  const handleChangeData = (data) => {
    console.log(data);
    setData(data);
  };

  return (
    <div className="ViewCollection">
      <div className={clsx(classes.content, "content")}>
        <CollectionBar
          collection={collection}
          handleChangeData={handleChangeData}
        />

      </div>
    </div>
  );
}
