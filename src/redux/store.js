import { configureStore } from "@reduxjs/toolkit";

import dataReducer from "./slice/dataSlice";
import userReducer from "./slice/userSlice";
import categoriesReducer from "./slice/categoriesSlice";

const store = configureStore({
  reducer: {
    user: userReducer.reducer,
    categories: categoriesReducer.reducer,
    data: dataReducer.reducer,
  },
});

export default store;

// import { createStore } from "redux";
// import rootReducer from "./reducer";
// import { composeWithDevTools } from "redux-devtools-extension";

// const composedEnhancers = composeWithDevTools();
// // const store = createStore(rootReducer, initValue, enhancers);
// const store = createStore(rootReducer, composedEnhancers);
