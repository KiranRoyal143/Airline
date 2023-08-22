// flightsActions.js
export const FETCH_FLIGHTS_REQUEST = "FETCH_FLIGHTS_REQUEST";
export const FETCH_FLIGHTS_SUCCESS = "FETCH_FLIGHTS_SUCCESS";
export const FETCH_FLIGHTS_FAILURE = "FETCH_FLIGHTS_FAILURE";

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
