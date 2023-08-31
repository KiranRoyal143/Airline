// flightsReducer.js
// Import action types
import {
  FETCH_FLIGHTS_SUCCESS,
  FETCH_FLIGHTS_FAILURE,
  ADD_ANCILLARY_SERVICE,
  DELETE_ANCILLARY_SERVICE,
  UPDATE_PASSENGER_DETAILS,
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

const addAncillaryServiceReducer = (state, payload) => {
  const { flight, service } = payload;
  const updatedFlights = state.flights.map((f) =>
    f.id === flight.id
      ? {
          ...f,
          passengers: f.passengers.map((p) =>
            p.id === flight.id
              ? { ...p, ancillaryServices: [...p.ancillaryServices, service] }
              : p
          ),
        }
      : f
  );

  return {
    ...state,
    flights: updatedFlights,
  };
};

const deleteAncillaryServiceReducer = (state, payload) => {
  // Implement the logic to delete an ancillary service from a flight
  // Return the updated state
};

const updatePassengerDetailsReducer = (state, payload) => {
  // Implement the logic to update passenger details
  // Return the updated state
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
    case ADD_ANCILLARY_SERVICE:
      return addAncillaryServiceReducer(state, action.payload);
    case DELETE_ANCILLARY_SERVICE:
      return deleteAncillaryServiceReducer(state, action.payload);
    case UPDATE_PASSENGER_DETAILS:
      return updatePassengerDetailsReducer(state, action.payload);
    default:
      return state;
  }
};

export default flightsReducer;
