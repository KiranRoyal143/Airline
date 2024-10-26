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
  UPDATE_ANCILLARY_SERVICES,
  UPDATE_SPECIAL_MEALS,
  UPDATE_SHOPPING_ITEMS,
  DELETE_ANCILLARY_SERVICE,
  ADD_PASSENGER,
  DELETE_PASSENGER,
  DELETE_SHOPPING_ITEM,
  DELETE_MEAL_PREFERENCE,
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
      const newState = {
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
      return newState;

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
        flights: state.flights.map((flight) =>
          flight.id === action.payload.flightId.toString()
            ? {
                ...flight,
                passengers: flight.passengers.map((p) =>
                  p.id === Number(action.payload.passengerId)
                    ? { ...p, name: action.payload.newName }
                    : p
                ),
              }
            : flight
        ),
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
        flights: state.flights.map((flight) =>
          flight.id === action.payload.flightId.toString()
            ? {
                ...flight,
                passengers: flight.passengers.map((passenger) =>
                  passenger.id === Number(action.payload.passengerId)
                    ? {
                        ...passenger,
                        address: action.payload.updatedAddressDetails,
                      }
                    : passenger
                ),
              }
            : flight
        ),
      };
    case UPDATE_ANCILLARY_SERVICES:
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
                      action.payload.updatedAncillaryServices,
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
    case UPDATE_SPECIAL_MEALS:
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
                    mealPreference: [
                      ...passenger.mealPreference,
                      action.payload.updatedMeals,
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
    case UPDATE_SHOPPING_ITEMS:
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
                      action.payload.updatedShoppingItem,
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
    case DELETE_ANCILLARY_SERVICE:
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
                    // Use the updated ancillary services array directly
                    ancillaryServices: action.payload.updatedAncillaryServices,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };

    case ADD_PASSENGER:
      return {
        ...state,
        flights: state.flights.map((flight) =>
          flight.id === action.payload.flightId
            ? {
                ...flight,
                passengers: [...flight.passengers, action.payload.passenger],
              }
            : flight
        ),
      };
    case DELETE_PASSENGER:
      console.log("DELETE_PASSENGER action payload:", action.payload);
      return {
        ...state,
        flights: state.flights.map((flight) => {
          if (flight.id === action.payload.flightId) {
            console.log("Updating flight:", flight);
            return {
              ...flight,
              passengers: flight.passengers.filter(
                (passenger) =>
                  passenger.id.toString() !== action.payload.passengerId
              ),
            };
          }
          return flight;
        }),
      };
    case DELETE_SHOPPING_ITEM:
      console.log("DELETE_SHOPPING_ITEM action payload:", action.payload);
      return {
        ...state,
        flights: state.flights.map((flight) => {
          if (flight.id === action.payload.flightId) {
            console.log("Updating flight:", flight);
            return {
              ...flight,
              passengers: flight.passengers.map((passenger) => {
                if (passenger.id === action.payload.passengerId) {
                  console.log("Updating passenger:", passenger);
                  return {
                    ...passenger,
                    inFlightShopRequests: action.payload.updatedShoppingItems,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case DELETE_MEAL_PREFERENCE:
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
                    // Use the updated special meals array directly
                    mealPreference: action.payload.updatedSpecialMeals,
                  };
                }
                return passenger;
              }),
            };
          }
          return flight;
        }),
      };
    case UPDATE_FLIGHT:
      return {
        ...state,
        flights: state.flights.map((flight) =>
          flight.id === action.payload.id ? action.payload : flight
        ),
      };

    case UPDATE_PASSENGER_DETAILS:
      // Implement your logic for updating passenger details
      return state;
    default:
      return state;
  }
};

export default flightsReducer;
