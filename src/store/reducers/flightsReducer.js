import {
  FETCH_FLIGHTS_SUCCESS,
  FETCH_FLIGHTS_FAILURE,
  ADD_ANCILLARY_SERVICE,
  DELETE_ANCILLARY_SERVICE,
  UPDATE_PASSENGER_DETAILS,
  UPDATE_FLIGHT,
  CHANGE_PASSENGER_SEAT,
  UPDATE_PASSENGER_CHECK_IN,
  UNDO_PASSENGER_CHECK_IN,
} from "../actions/flightsActions";

const initialState = {
  flights: [],
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
    case UPDATE_FLIGHT:
      return {
        ...state,
        flights: state.flights.map((flight) =>
          flight.id === action.payload.id ? action.payload : flight
        ),
      };
    case CHANGE_PASSENGER_SEAT:
      return {
        ...state,
        flights: state.flights.map((flight) => {
          if (flight.id === action.payload.flightId) {
            return {
              ...flight,
              passengers: flight.passengers.map((passenger) => {
                if (passenger.id === action.payload.passengerId) {
                  return {
                    ...passenger,
                    seatNumber: action.payload.newSeat,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };

    case ADD_ANCILLARY_SERVICE:
      // Implement your logic for adding ancillary service
      return state;
    case DELETE_ANCILLARY_SERVICE:
      // Implement your logic for deleting ancillary service
      return state;
    case UPDATE_PASSENGER_DETAILS:
      // Implement your logic for updating passenger details
      return state;
    case UPDATE_PASSENGER_CHECK_IN:
      // Implement your logic for updating passenger check-in status
      return state;
    case UNDO_PASSENGER_CHECK_IN:
      // Implement your logic for undoing passenger check-in status
      return state;
    default:
      return state;
  }
};

export default flightsReducer;
