import React from "react";

export default function ListCollections(props) {
  return (
    <div className="ListCollections">
      <div
        className="content"
        style={{
          textAlign: "left",
          maxWidth: `${props.data.length > 0 ? `70rem` : `40rem`}`,
          minWidth: `${props.data.length > 0 ? `70rem` : `40rem`}`,
        }}
      >
        <div
          className="title"
          style={{
            fontSize: "3rem",
            fontWeight: "bold",
            margin: "2rem 0",
          }}
        >
          {props.data.length > 0 ? "Collections" : "You have no collections."}
        </div>

        <div
          className="collections"
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: `repeat(${
              props.data.length > 0 ? "2" : "1"
            },1fr)`,
            gap: "1.7rem",
            transition: "all 0.3s ease",
          }}
        >
          {props.data &&
            props.data.length > 0 &&
            props.data.map((collection) => {
              console.log(collection.cId);
              return (
                <div
                  className="collection d-flex"
                  style={{
                    padding: "2.2rem 2.5rem",
                    borderRadius: "2rem",
                    gap: "2rem",
                    cursor: "pointer",
                    backgroundColor: "var(--background-color-header)",
                    transition: "all ease 0.3s",
                  }}
                  key={collection.id}
                >
                  <div
                    className="collection__tag d-flex"
                    style={{
                      padding: "1.3rem",
                      borderRadius: "1.5rem",
                      backgroundColor: `${collection.cColor}`,
                    }}
                  >
                    <ion-icon
                      name="bowling-ball-outline"
                      style={{
                        fontSize: "3.2rem",
                      }}
                    ></ion-icon>
                  </div>
                  <div className="collection__details">
                    <div
                      className="collection__name"
                      style={{
                        width: "fit-content",
                        textAlign: "left",
                        fontSize: "2rem",
                        textTransform: "capitalize",
                        display: "-webkit-box",
                        webkitLineClamp: "1",
                        webkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                      }}
                    >
                      {collection.cName}
                    </div>
                    <div
                      className="collection__count-tasks"
                      style={{
                        color: "#A1A1A6",
                        fontSize: "1.6rem",
                      }}
                    >
                      No tasks
                    </div>
                  </div>
                </div>
              );
            })}

          <button
            className="addCollection button btn--flex btn--border btn--hover-bg-gray"
            style={{
              height: "fit-content",
              margin: "auto 0",
              borderRadius: "1.5rem",
            }}
          >
            <ion-icon name="add-outline"></ion-icon>
            {props.data.length > 0
              ? "Add Collections"
              : "Add Your First Collection"}
          </button>
        </div>
      </div>
    </div>
  );
}
