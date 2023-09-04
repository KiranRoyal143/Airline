// flightsActions.js
export const FETCH_FLIGHTS_REQUEST = "FETCH_FLIGHTS_REQUEST";
export const FETCH_FLIGHTS_SUCCESS = "FETCH_FLIGHTS_SUCCESS";
export const FETCH_FLIGHTS_FAILURE = "FETCH_FLIGHTS_FAILURE";

export const ADD_ANCILLARY_SERVICE = "ADD_ANCILLARY_SERVICE";
export const DELETE_ANCILLARY_SERVICE = "DELETE_ANCILLARY_SERVICE";
export const UPDATE_PASSENGER_DETAILS = "UPDATE_PASSENGER_DETAILS";
export const CHANGE_PASSENGER_SEAT = "CHANGE_PASSENGER_SEAT";
export const UPDATE_PASSENGER_CHECK_IN = "UPDATE_PASSENGER_CHECK_IN";
export const UNDO_PASSENGER_CHECK_IN = "UNDO_PASSENGER_CHECK_IN";
export const ADD_IN_FLIGHT_SHOP_REQUEST = "ADD_IN_FLIGHT_SHOP_REQUEST";
export const CHANGE_MEAL_PREFERENCE = "CHANGE_MEAL_PREFERENCE";

// Action creator to change a passenger's seat
export const changePassengerSeat = (flightId, passengerId, newSeat) => {
  return {
    type: CHANGE_PASSENGER_SEAT,
    payload: { flightId, passengerId, newSeat },
  };
};
// Action creators
export const fetchFlightsRequest = () => {
  return {
    type: FETCH_FLIGHTS_REQUEST,
  };
};

export const fetchFlightsSuccess = (flights) => {
  return {
    type: FETCH_FLIGHTS_SUCCESS,
    payload: flights,
  };
};

export const fetchFlightsFailure = (error) => {
  return {
    type: FETCH_FLIGHTS_FAILURE,
    payload: error,
  };
};
export const addInFlightShopRequest = (flightId, passengerId, newItem) => {
  return {
    type: ADD_IN_FLIGHT_SHOP_REQUEST,
    payload: { flightId, passengerId, newItem },
  };
};
export const changeMealPreference = (
  flightId,
  passengerId,
  newMealPreference
) => {
  return {
    type: CHANGE_MEAL_PREFERENCE,
    payload: { flightId, passengerId, newMealPreference },
  };
};
// Async action creator
export const fetchFlights = () => {
  return (dispatch) => {
    dispatch(fetchFlightsRequest());

    // Simulate an API call (replace with actual API call)
    setTimeout(() => {
      const dummyFlights = [
        // Your flight data here
      ];
      dispatch(fetchFlightsSuccess(dummyFlights));
    }, 1000);
  };
};

// Async action creator
export const addAncillaryService = (flight, service) => {
  return (dispatch) => {
    // Implement the logic to add an ancillary service to a flight
    // Then dispatch the ADD_ANCILLARY_SERVICE action
    dispatch({
      type: ADD_ANCILLARY_SERVICE,
      payload: { flight, service },
    });
  };
};

export const deleteAncillaryService = (flight, service) => {
  return (dispatch) => {
    // Implement the logic to delete an ancillary service from a flight
    // Then dispatch the DELETE_ANCILLARY_SERVICE action
    dispatch({
      type: DELETE_ANCILLARY_SERVICE,
      payload: { flight, service },
    });
  };
};
export const updatePassengerCheckIn = (flightId, passengerId) => {
  // Your logic to update passenger check-in status
};

export const undoPassengerCheckIn = (flightId, passengerId) => {
  // Your logic to undo passenger check-in status
};
export const updatePassengerDetails = (flight, updatedPassenger) => {
  return (dispatch) => {
    // Implement the logic to update passenger details
    // Then dispatch the UPDATE_PASSENGER_DETAILS action
    dispatch({
      type: UPDATE_PASSENGER_DETAILS,
      payload: { flight, updatedPassenger },
    });
  };
};
