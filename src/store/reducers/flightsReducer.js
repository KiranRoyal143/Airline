import {
  FETCH_FLIGHTS_SUCCESS,
  FETCH_FLIGHTS_FAILURE,
  ADD_ANCILLARY_SERVICE,
  UPDATE_PASSENGER_DETAILS,
  UPDATE_FLIGHT,
  CHANGE_PASSENGER_SEAT,
  CHANGE_MEAL_PREFERENCE,
  ADD_IN_FLIGHT_SHOP_REQUEST,
  UPDATE_PASSENGER_NAME,
  UPDATE_PASSPORT_DETAILS,
  UPDATE_ADDRESS_DETAILS,
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
                    ancillaryServices: [
                      ...passenger.ancillaryServices,
                      action.payload.service,
                    ],
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case CHANGE_MEAL_PREFERENCE:
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
                    mealPreference: action.payload.newMealPreference,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case ADD_IN_FLIGHT_SHOP_REQUEST:
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
                    inFlightShopRequests: [
                      ...passenger.inFlightShopRequests,
                      action.payload.newItem,
                    ],
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case UPDATE_PASSENGER_NAME:
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
                    name: action.payload.updateNameDetails,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case UPDATE_PASSPORT_DETAILS:
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
                    passport: action.payload.updatedPassportDetails,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case UPDATE_ADDRESS_DETAILS:
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
                    address: action.payload.updatedAdressDetails,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case UPDATE_PASSENGER_DETAILS:
      // Implement your logic for updating passenger details
      return state;
    default:
      return state;
  }
};

export default flightsReducer;
