// actions/flightsActions.js
const fetchFlightsSuccess = (flights) => ({
    type: 'FETCH_FLIGHTS_SUCCESS',
    payload: flights,
  });
  
  const fetchFlightsFailure = () => ({
    type: 'FETCH_FLIGHTS_FAILURE',
  });
  
  // Example asynchronous action to fetch flights from an API
  export const fetchFlights = () => (dispatch) => {
    fetch('your_api_endpoint')
      .then((response) => response.json())
      .then((data) => dispatch(fetchFlightsSuccess(data)))
      .catch((error) => {
        console.error(error);
        dispatch(fetchFlightsFailure());
      });
  };
  