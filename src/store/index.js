// src/store/index.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Import Redux Thunk
import rootReducer from "./store/reducers";

// Create the Redux store with the rootReducer and Redux Thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
