import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./reducers/userSlice";
import dataReducer from "./reducers/dataSlice";
import categoriesReducer from "./reducers/categoriesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const reducer = combineReducers({
  user: userReducer.reducer,
  categories: categoriesReducer.reducer,
  data: dataReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
