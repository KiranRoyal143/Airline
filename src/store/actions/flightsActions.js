// actions/flightsActions.js

// Action types
export const FETCH_FLIGHTS_SUCCESS = "FETCH_FLIGHTS_SUCCESS";
export const FETCH_FLIGHTS_FAILURE = "FETCH_FLIGHTS_FAILURE";
export const ADD_ANCILLARY_SERVICE = "ADD_ANCILLARY_SERVICE";
export const DELETE_ANCILLARY_SERVICE = "DELETE_ANCILLARY_SERVICE";
export const UPDATE_PASSENGER_DETAILS = "UPDATE_PASSENGER_DETAILS";
export const UPDATE_FLIGHT = "UPDATE_FLIGHT";
export const CHANGE_PASSENGER_SEAT = "CHANGE_PASSENGER_SEAT";
export const UPDATE_PASSENGER_CHECK_IN = "UPDATE_PASSENGER_CHECK_IN";
export const UNDO_PASSENGER_CHECK_IN = "UNDO_PASSENGER_CHECK_IN";
export const ADD_IN_FLIGHT_SHOP_REQUEST = "ADD_IN_FLIGHT_SHOP_REQUEST";
export const CHANGE_MEAL_PREFERENCE = "CHANGE_MEAL_PREFERENCE";

// Action creators
export const fetchFlightsSuccess = (flights) => ({
  type: FETCH_FLIGHTS_SUCCESS,
  payload: flights,
});

export const fetchFlightsFailure = (error) => ({
  type: FETCH_FLIGHTS_FAILURE,
  payload: error,
});

export const addAncillaryService = (flightId, service) => ({
  type: ADD_ANCILLARY_SERVICE,
  payload: { flightId, service },
});

export const deleteAncillaryService = (flightId, service) => ({
  type: DELETE_ANCILLARY_SERVICE,
  payload: { flightId, service },
});

export const updatePassengerDetails = (
  flightId,
  passengerId,
  updatedPassenger
) => ({
  type: UPDATE_PASSENGER_DETAILS,
  payload: { flightId, passengerId, updatedPassenger },
});

export const updateFlight = (updatedFlight) => ({
  type: UPDATE_FLIGHT,
  payload: updatedFlight,
});

export const addInFlightShopRequest = (flightId, passengerId, newItem) => ({
  type: ADD_IN_FLIGHT_SHOP_REQUEST,
  payload: { flightId, passengerId, newItem },
});

export const changeMealPreference = (flightId, passengerId) => ({
  type: CHANGE_MEAL_PREFERENCE,
  payload: { flightId, passengerId },
});

export const fetchFlights = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3000/flights");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      dispatch(fetchFlightsSuccess(data));
    } catch (error) {
      dispatch(fetchFlightsFailure(error.message));
    }
  };
};

export const updatePassengerCheckIn = (flightId, passengerId) => {
  return async (dispatch, getState) => {
    try {
      const { flights } = getState();
      const flightIndex = flights.flights.findIndex(
        (flight) => flight.id === flightId
      );
      if (flightIndex === -1) {
        throw new Error("Flight not found.");
      }

      const passengerIndex = flights.flights[flightIndex].passengers.findIndex(
        (passenger) => passenger.id === passengerId
      );
      if (passengerIndex === -1) {
        throw new Error("Passenger not found.");
      }

      const updatedFlight = { ...flights.flights[flightIndex] };
      const updatedPassenger = { ...updatedFlight.passengers[passengerIndex] };

      updatedPassenger.isCheckedIn = true;

      updatedFlight.passengers[passengerIndex] = updatedPassenger;

      await fetch("http://localhost:3000/flights/" + flightId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFlight),
      });

      dispatch({
        type: UPDATE_FLIGHT,
        payload: updatedFlight,
      });
    } catch (error) {
      console.error("Error updating passenger check-in:", error);
    }
  };
};

export const undoPassengerCheckIn = (flightId, passengerId) => {
  return async (dispatch, getState) => {
    try {
      const { flights } = getState();
      const flightIndex = flights.flights.findIndex(
        (flight) => flight.id === flightId
      );
      if (flightIndex === -1) {
        throw new Error("Flight not found.");
      }

      const passengerIndex = flights.flights[flightIndex].passengers.findIndex(
        (passenger) => passenger.id === passengerId
      );
      if (passengerIndex === -1) {
        throw new Error("Passenger not found.");
      }

      const updatedFlight = { ...flights.flights[flightIndex] };
      const updatedPassenger = { ...updatedFlight.passengers[passengerIndex] };

      updatedPassenger.isCheckedIn = false;

      updatedFlight.passengers[passengerIndex] = updatedPassenger;

      await fetch("http://localhost:3000/flights/" + flightId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFlight),
      });

      dispatch({
        type: UPDATE_FLIGHT,
        payload: updatedFlight,
      });
    } catch (error) {
      console.error("Error undoing passenger check-in:", error);
    }
  };
};

export const changePassengerSeat = (flightId, passengerId, newSeat) => {
  return async (dispatch, getState) => {
    try {
      const { flights } = getState();
      const flightIndex = flights.flights.findIndex(
        (flight) => flight.id === flightId
      );
      if (flightIndex === -1) {
        throw new Error("Flight not found.");
      }

      const passengerIndex = flights.flights[flightIndex].passengers.findIndex(
        (passenger) => passenger.id === passengerId
      );
      if (passengerIndex === -1) {
        throw new Error("Passenger not found.");
      }

      const updatedFlight = { ...flights.flights[flightIndex] };
      const updatedPassengers = [...updatedFlight.passengers]; // Make a copy of passengers array
      const updatedPassengerIndex = updatedPassengers.findIndex(
        (passenger) => passenger.id === passengerId
      );

      if (updatedPassengerIndex === -1) {
        throw new Error("Passenger not found in the updated passengers array.");
      }

      // Update the seat number of the passenger
      updatedPassengers[updatedPassengerIndex] = {
        ...updatedPassengers[updatedPassengerIndex],
        seatNumber: newSeat,
      };

      // Update the passengers array in the updated flight object
      updatedFlight.passengers = updatedPassengers;

      // Update the flight on the server
      await fetch(`http://localhost:3000/flights/${flightId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFlight),
      });

      dispatch({
        type: UPDATE_FLIGHT,
        payload: updatedFlight,
      });
    } catch (error) {
      console.error("Error changing passenger seat:", error);
    }
  };
};
