import React from "react";

function CollectionBar(props) {
  const collection = props.data;

  return (
    <div className="collection__bar d-flex align-items-center w-100" style={{}}>
      <div
        className="collection__back-btn"
        style={{
          padding: "1.2rem",
          marginRight: "1.5rem",
          borderRadius: "1.5rem",
          backgroundColor: "var(--background-color-header)",
          cursor: "pointer",
        }}
      >
        <ion-icon
          name="chevron-back-outline"
          style={{
            fontSize: "2.7rem",
          }}
        ></ion-icon>
      </div>
      <div
        className="collection__name"
        style={{
          fontSize: "3rem",
          textTransform: "capitalize",
        }}
      >
        {collection.cName}
      </div>
      <div
        className="collection__dots ml-auto position-relative"
        style={{
          cursor: "pointer",
        }}
      >
        <ion-icon
          name="ellipsis-horizontal"
          style={{
            fontSize: "2.5rem",
          }}
        ></ion-icon>
        <div
          className="collection__actions position-absolute d-none"
          style={{
            minWidth: "max-content",
            right: "0",
            borderRadius: "1.1rem",
            backgroundColor: "#1e1e29",
            zIndex: "2",
          }}
        >
          <div
            className="collection__action button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
            style={{
              width: "20rem",
            }}
          >
            edit collection
          </div>
          <div
            className="collection__action button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
            style={{
              width: "20rem",
            }}
          >
            delete collection
          </div>
        </div>
      </div>
    </div>
  );
}
function AddTask(props) {
  const collection = props.data;
  return (
    <div
      className="doing-tasks__tab"
      style={{
        width: "48%",
      }}
    >
      <div
        className="doing-tasks__title mb-4"
        style={{
          fontSize: "1.6rem",
          textTransform: "capitalize",
        }}
      >
        Add a task
      </div>
      <div
        className="doing-tasks__bar w-100 d-flex align-items-center"
        style={{
          padding: "0 1.3rem",
          borderRadius: "1.3rem",
          border: "3px solid var(--background-color-header)",
        }}
      >
        <div
          className="doing-tasks__button d-flex"
          style={{
            padding: "0.3rem",
            borderRadius: "0.7rem",
            backgroundColor: `${collection.cColor}`,
          }}
        >
          <ion-icon
            name="add"
            style={{
              fontSize: "1.7rem",
              cursor: "pointer",
            }}
          ></ion-icon>
        </div>
        <div className="doing-tasks__input w-100">
          <input
            type="text"
            placeholder="Add task"
            className="w-100 input--none-border"
            style={{
              fontSize: "1.6rem",
            }}
          />
        </div>
        <div
          className="doing-tasks__button"
          style={{
            backgroundColor: "var()",
          }}
        >
          <ion-icon
            name="close"
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          ></ion-icon>
        </div>
      </div>
    </div>
  );
}
function SearchTasks(props) {
  const collection = props.data;
  return (
    <div
      className="doing-tasks__tab"
      style={{
        width: "48%",
      }}
    >
      <div
        className="doing-tasks__title mb-4"
        style={{
          fontSize: "1.6rem",
          textTransform: "capitalize",
        }}
      >
        Search tasks
      </div>
      <div
        className="doing-tasks__bar w-100 d-flex align-items-center"
        style={{
          paddingRight: "1.3rem",
          borderRadius: "1.3rem",
          border: "3px solid var(--background-color-header)",
        }}
      >
        <div className="doing-tasks__input w-100">
          <input
            type="text"
            placeholder="Input tasks name"
            className="w-100 input--none-border"
            style={{
              fontSize: "1.6rem",
            }}
          />
        </div>

        <div
          className="doing-tasks__button"
          style={{
            backgroundColor: "var()",
          }}
        >
          <ion-icon
            name="search"
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          ></ion-icon>
        </div>
      </div>
    </div>
  );
}
function DoingTasks(props) {
  const collection = props.data;
  return (
    <div
      className="doing-tasks__tab"
      style={{
        width: "48%",
      }}
    >
      <div
        className="doing-tasks__title mb-4"
        style={{
          fontSize: "1.6rem",
          textTransform: "capitalize",
        }}
      >
        Doing Tasks - {0}
      </div>
      <div
        className="doing-tasks__bar w-100 position-relative d-flex align-items-center"
        style={{
          padding: "0.3rem 1.3rem 1.3rem 1.3rem",
          borderTopLeftRadius: "1.3rem",
          borderTopRightRadius: "1.3rem",
          border: "3px solid var(--background-color-header)",
        }}
      >
        <input
          type="checkbox"
          className="doing-tasks__button d-flex"
          style={{
            padding: "0.3rem",
            borderRadius: "0.7rem",
            backgroundColor: `${collection.cColor}`,
          }}
        ></input>

        <div
          className="doing-tasks__input w-100"
          style={{
            fontSize: "1.6rem",
            padding: "0.5rem 1.5rem",
          }}
        >
          {
            "sjdbnsdjv jdfkghfjb n euig hergigheruigheruig er g ueru g er ergu erigheru ierh gaserui ghergui "
          }
        </div>

        <div
          className="doing-tasks__button position-relative"
          style={{
            backgroundColor: "var()",
          }}
        >
          <ion-icon
            name="ellipsis-vertical"
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          ></ion-icon>
          <div
            className="collection__actions position-absolute"
            style={{
              minWidth: "max-content",
              right: "0",
              borderRadius: "1.1rem",
              backgroundColor: "#1e1e29",
              zIndex: "2",
            }}
          >
            <div
              className="collection__action button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
              style={{
                width: "20rem",
              }}
            >
              edit task
            </div>
            <div
              className="collection__action button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
              style={{
                width: "20rem",
              }}
            >
              delete task
            </div>
          </div>
        </div>

        <div
          className="doing-tasks__process w-100 position-absolute"
          style={{
            top: "100.5%",
            left: "0",
          }}
        >
          <div
            className="doing-tasks__process-bar"
            style={{
              width: "0%",
              height: "2.5px",
              backgroundColor: `${collection.cColor}`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
function CompletedTasks(props) {
  const collection = props.data;
  return (
    <div
      className="doing-tasks__tab"
      style={{
        width: "48%",
      }}
    >
      <div
        className="doing-tasks__title mb-4"
        style={{
          fontSize: "1.6rem",
          textTransform: "capitalize",
        }}
      >
        Completed Tasks - {0}
      </div>
      <div
        className="doing-tasks__bar position-relative w-100 d-flex align-items-center"
        style={{
          padding: "0.3rem 1.3rem 1.3rem 1.3rem",
          borderTopLeftRadius: "1.3rem",
          borderTopRightRadius: "1.3rem",
          border: "3px solid var(--background-color-header)",
        }}
      >
        <div
          className="doing-tasks__button d-flex"
          style={{
            padding: "0.3rem",
            borderRadius: "0.7rem",
            backgroundColor: `${collection.cColor}`,
          }}
        >
          <ion-icon
            name="checkmark"
            style={{
              fontSize: "1.7rem",
              cursor: "pointer",
            }}
          ></ion-icon>
        </div>

        <div
          className="doing-tasks__input w-100"
          style={{
            fontSize: "1.6rem",
            padding: "0.5rem 1.5rem",
          }}
        >
          {
            "sjdbnsdjv jdfkghfjb n euig hergigheruigheruig er g ueru g er ergu erigheru ierh gaserui ghergui "
          }
        </div>

        <div
          className="doing-tasks__button"
          style={{
            backgroundColor: "var()",
          }}
        >
          <ion-icon
            name="ellipsis-vertical"
            style={{
              fontSize: "2rem",
              cursor: "pointer",
            }}
          ></ion-icon>
          <div
            className="collection__actions position-absolute"
            style={{
              minWidth: "max-content",
              right: "0",
              borderRadius: "1.1rem",
              backgroundColor: "#1e1e29",
              zIndex: "2",
            }}
          >
            <div
              className="collection__action button btn--none-border btn--full-width btn--none-radius btn--hover-bg-gray m-0 text-left text-capitalize"
              style={{
                width: "20rem",
              }}
            >
              delete task
            </div>
          </div>
        </div>

        <div
          className="doing-tasks__process w-100 position-absolute"
          style={{
            top: "100.5%",
            left: "0",
          }}
        >
          <div
            className="doing-tasks__process-bar"
            style={{
              width: "100%",
              height: "2.5px",
              backgroundColor: `${collection.cColor}`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function ViewCollection(props) {
  const collection = props.task;
  console.log(collection);

  return (
    <div className="ViewCollection">
      <div
        className="content d-flex flex-column"
        style={{
          textAlign: "left",
          maxWidth: "70rem",
          minWidth: "70rem",
        }}
      >
        <CollectionBar data={collection} />

        <div className="actions__tab d-flex justify-content-between w-100 mt-5">
          <AddTask data={collection} />
          <SearchTasks data={collection} />
        </div>

        <div className="tasks__tab d-flex justify-content-between w-100 mt-5">
          <DoingTasks data={collection} />
          <CompletedTasks data={collection} />
        </div>
      </div>
    </div>
  );
}
