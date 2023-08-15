import { combineReducers } from 'redux';
import flightsReducer from './flightsReducer'; // Import your flights reducer here

const rootReducer = combineReducers({
  flights: flightsReducer,
  // Add other reducers here if you have them
});

export default rootReducer;
