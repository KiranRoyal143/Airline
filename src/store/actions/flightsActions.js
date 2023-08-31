// flightsActions.js
export const FETCH_FLIGHTS_REQUEST = "FETCH_FLIGHTS_REQUEST";
export const FETCH_FLIGHTS_SUCCESS = "FETCH_FLIGHTS_SUCCESS";
export const FETCH_FLIGHTS_FAILURE = "FETCH_FLIGHTS_FAILURE";

export const ADD_ANCILLARY_SERVICE = "ADD_ANCILLARY_SERVICE";
export const DELETE_ANCILLARY_SERVICE = "DELETE_ANCILLARY_SERVICE";
export const UPDATE_PASSENGER_DETAILS = "UPDATE_PASSENGER_DETAILS";

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
