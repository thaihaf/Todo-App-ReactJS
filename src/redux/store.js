import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import isLoadingReducer from "./reducers/isLoadingSlice";
import userReducer from "./reducers/userSlice";
import dataReducer from "./reducers/dataSlice";
import categoriesReducer from "./reducers/categoriesSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const reducer = combineReducers({
  isLoading: isLoadingReducer.reducer,
  user: userReducer.reducer,
  categories: categoriesReducer.reducer,
  data: dataReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
