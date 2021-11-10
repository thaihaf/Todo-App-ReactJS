import React from "react";

import HeaderHome from "./headerHome/HeaderHome";
import Collection from "./collection/ListCollections";
import ViewCollection from "./collection/viewCollection/ViewCollection";

export default function Home() {
  let collections = [
    {
      cId: 1,
      cName: "lorem ipsum dolor sit amet, consectetur adipsegf lorem ipsum dolor sit amet, consectetur adip",
      cColor: "yellow",
    },
    { cId: 2, cName: "abc", cColor: "red" },
    { cId: 3, cName: "abc", cColor: "pink" },
    { cId: 4, cName: "abc", cColor: "coral" },
    { cId: 5, cName: "abc", cColor: "green" },
  ];
  return (
    <div className="Home">
      <HeaderHome />
      <div
        className="content"
        style={{
          maxWidth: "max-content",
        }}
      >
        {/* <Collection data={collections} /> */}
        <ViewCollection task={collections[3]}/>
      </div>
    </div>
  );
}
