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
export const UPDATE_PASSENGER_NAME = "UPDATE_PASSENGER_NAME";
export const UPDATE_PASSPORT_DETAILS = "UPDATE_PASSPORT_DETAILS";
export const UPDATE_ADDRESS_DETAILS = "UPDATE_ADDRESS_DETAILS";

// Action creators
export const fetchFlightsSuccess = (flights) => ({
  type: FETCH_FLIGHTS_SUCCESS,
  payload: flights,
});

export const fetchFlightsFailure = (error) => ({
  type: FETCH_FLIGHTS_FAILURE,
  payload: error,
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

export const addAncillaryService = (flightId, passengerId, service) => {
  return async (dispatch) => {
    try {
      // Fetch the flight data from the API
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      // Find the passenger in the flight data
      const passenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      // Update the passenger with the new ancillary service
      const updatedPassenger = {
        ...passenger,
        ancillaryServices: [...passenger.ancillaryServices, service],
      };

      // Create the updated flight object
      const updatedFlight = {
        ...flight,
        passengers: flight.passengers.map((p) =>
          p.id === passengerId ? updatedPassenger : p
        ),
      };

      // Update the flight on the server
      const putResponse = await fetch(
        `http://localhost:3000/flights/${flightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlight),
        }
      );

      if (!putResponse.ok) {
        throw new Error("Failed to update flight data");
      }

      // Dispatch the action with the updated payload
      dispatch({
        type: ADD_ANCILLARY_SERVICE,
        payload: {
          flightId,
          passengerId,
          service,
        },
      });
    } catch (error) {
      console.error("Error adding ancillary service:", error);
    }
  };
};

export const changeMealPreference = (
  flightId,
  passengerId,
  newMealPreference
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      const passenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      const updatedPassenger = {
        ...passenger,
        mealPreference: newMealPreference,
      };

      const updatedFlight = {
        ...flight,
        passenger: flight.passengers.map((p) =>
          p.id === passengerId ? updatedPassenger : p
        ),
      };

      const putResponse = await fetch(
        `http://localhost:3000/flights/${flightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlight),
        }
      );

      if (!putResponse.ok) {
        throw new Error("Failed to update flight data");
      }
      dispatch({
        type: CHANGE_MEAL_PREFERENCE,
        payload: {
          flightId,
          passengerId,
          newMealPreference,
        },
      });
    } catch (error) {
      console.error("Error adding ancillary service:", error);
    }
  };
};

export const addInFlightShopRequest = (flightId, passengerId, newItem) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      const passenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      const updatedPassenger = {
        ...passenger,
        inFlightShopRequests: [...passenger.inFlightShopRequests, newItem],
      };

      const updatedFlight = {
        ...flight,
        passengers: flight.passengers.map((p) =>
          p.id === passengerId ? updatedPassenger : p
        ),
      };

      const putResponse = await fetch(
        `http://localhost:3000/flights/${flightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlight),
        }
      );

      if (!putResponse.ok) {
        throw new Error("Failed to update flight data");
      }

      dispatch({
        type: ADD_IN_FLIGHT_SHOP_REQUEST,
        payload: {
          flightId,
          passengerId,
          newItem,
        },
      });
    } catch (error) {
      console.error("Error adding in-flight shop request:", error);
    }
  };
};

export const updatePassengerName = (flightId, passengerId, newName) => {
  return async (dispatch) => {
    try {
      // Fetch the flight data
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      // Find the correct passenger within the flight
      const passengerIndex = flight.passengers.findIndex(
        (passenger) => passenger.id === passengerId
      );
      if (passengerIndex === -1) {
        throw new Error("Passenger not found");
      }

      // Create a new passenger object with updated name
      const updatedPassenger = {
        ...flight.passengers[passengerIndex],
        name: newName,
      };

      // Update the passenger within the flight
      const updatedPassengers = [
        ...flight.passengers.slice(0, passengerIndex),
        updatedPassenger,
        ...flight.passengers.slice(passengerIndex + 1),
      ];

      // Create updated flight object with new passengers array
      const updatedFlight = {
        ...flight,
        passengers: updatedPassengers,
      };

      // Update the flight data on the server
      const putResponse = await fetch(
        `http://localhost:3000/flights/${flightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlight),
        }
      );

      if (!putResponse.ok) {
        throw new Error("Failed to update flight data");
      }

      // Dispatch action to update state in Redux store
      dispatch({
        type: UPDATE_PASSPORT_DETAILS,
        payload: {
          flightId,
          passengerId,
          newName,
        },
      });
    } catch (error) {
      console.error("Error updating passenger name:", error);
    }
  };
};

export const updatePassportDetails = (
  flightId,
  passengerId,
  updatedPassportDetails
) => {
  return async (dispatch) => {
    try {
      // Fetch the flight data
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      // Find the correct passenger within the flight
      const passengerIndex = flight.passengers.findIndex(
        (passenger) => passenger.id === passengerId
      );
      if (passengerIndex === -1) {
        throw new Error("Passenger not found");
      }

      // Create a new passenger object with updated name
      const updatedPassenger = {
        ...flight.passengers[passengerIndex],
        passport: updatedPassportDetails,
      };

      // Update the passenger within the flight
      const updatedPassengers = [
        ...flight.passengers.slice(0, passengerIndex),
        updatedPassenger,
        ...flight.passengers.slice(passengerIndex + 1),
      ];

      // Create updated flight object with new passengers array
      const updatedFlight = {
        ...flight,
        passengers: updatedPassengers,
      };

      // Update the flight data on the server
      const putResponse = await fetch(
        `http://localhost:3000/flights/${flightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlight),
        }
      );

      if (!putResponse.ok) {
        throw new Error("Failed to update flight data");
      }

      // Dispatch action to update state in Redux store
      dispatch({
        type: UPDATE_PASSENGER_NAME,
        payload: {
          flightId,
          passengerId,
          updatedPassportDetails,
        },
      });
    } catch (error) {
      console.error("Error updating passenger name:", error);
    }
  };
};

export const updateAddressDetails = (
  flightId,
  passengerId,
  updatedAdressDetails
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      const passenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      const updatedPassenger = {
        ...passenger,
        address: updatedAdressDetails,
      };

      const updatedFlight = {
        ...flight,
        passenger: flight.passengers.map((p) =>
          p.id === passengerId ? updatedPassenger : p
        ),
      };

      const putResponse = await fetch(
        `http://localhost:3000/flights/${flightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlight),
        }
      );

      if (!putResponse.ok) {
        throw new Error("Failed to update flight data");
      }
      dispatch({
        type: UPDATE_ADDRESS_DETAILS,
        payload: {
          flightId,
          passengerId,
          updatedAdressDetails,
        },
      });
    } catch (error) {
      console.error("Error Address details service:", error);
    }
  };
};
