// src/store/index.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import Redux Thunk
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./store/reducers";

// Create the Redux store with the rootReducer and Redux Thunk middleware
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
