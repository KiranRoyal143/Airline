const flightsReducer = (state = null, action) => {
    // Handle different actions to update the flights state
    switch (action.type) {
      case 'FETCH_FLIGHTS_SUCCESS':
        return action.payload; // Assuming action.payload contains the fetched flights data
      case 'FETCH_FLIGHTS_FAILURE':
        return null; // Return null or some initial state if the data fetch fails
      default:
        return state;
    }
  };
  
  export default flightsReducer;
  