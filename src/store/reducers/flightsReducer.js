// flightsReducer.js
// Import action types
import {
  FETCH_FLIGHTS_SUCCESS,
  FETCH_FLIGHTS_FAILURE,
} from "../actions/flightsActions";

const initialState = {
  flights: [
    {
      id: 1,
      flightNumber: "ABC123",
      scheduleTime: "2023-07-24 10:00",
      passengers: [
        {
          id: 1,
          name: "John Doe",
          ancillaryServices: ["Extra Legroom", "In-flight Meal"],
          seatNumber: "1A",
          isCheckedIn: true,
          requiresWheelchair: false,
          hasInfant: false,
        },
        {
          id: 2,
          name: "Jane Smith",
          ancillaryServices: ["Priority Boarding"],
          seatNumber: "1B",
          isCheckedIn: false,
          requiresWheelchair: true,
          hasInfant: false,
        },
        // Add more passengers for this flight
      ],

      // Add more flights here
    },
  ],
  // Initialize with an empty array
  loading: false,
  error: null,
};

const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FLIGHTS_SUCCESS:
      return {
        ...state,
        flights: action.payload,
        error: null,
      };
    case FETCH_FLIGHTS_FAILURE:
      return {
        ...state,
        flights: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default flightsReducer;
