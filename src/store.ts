import { configureStore, combineReducers } from "@reduxjs/toolkit";

import reducerUtil from "utils/reducerUtil";
import configData from "config/reducerData";
import userData from "user/reducerData";

let store: ReturnType<typeof initStore>;

// combine reducers
const reducer = combineReducers({
  [configData._name]: reducerUtil.createReducer(configData),
  [userData._name]: reducerUtil.createReducer(userData)
});

// setup state
const initStore = (preloadedState?: State) =>
  configureStore({
    reducer,
    preloadedState,
    devTools: process.env.NODE_ENV !== "production"
  });

const initializeStore = (preloadedState: State) => {
  if (typeof window === "undefined" || !store) store = initStore(preloadedState);
  return store;
};

export default initializeStore;
