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
export const UPDATE_ANCILLARY_SERVICES = "UPDATE_ANCILLARY_SERVICES";
export const UPDATE_SPECIAL_MEALS = "UPDATE_SPECIAL_MEALS";
export const UPDATE_SHOPPING_ITEMS = "UPDATE_SHOPPING_ITEMS";
export const ADD_PASSENGER = "ADD_PASSENGER";
export const DELETE_PASSENGER = "DELETE_PASSENGER";
export const DELETE_SHOPPING_ITEM = "DELETE_SHOPPING_ITEM";

// Action creators
export const fetchFlightsSuccess = (flights) => ({
  type: FETCH_FLIGHTS_SUCCESS,
  payload: flights,
});

export const fetchFlightsFailure = (error) => ({
  type: FETCH_FLIGHTS_FAILURE,
  payload: error,
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

export const addPassenger = (flightId, passenger) => {
  return async (dispatch, getState) => {
    try {
      // Fetch the flight data from the API
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      // Add the new passenger to the flight's passengers array
      const updatedFlight = {
        ...flight,
        passengers: [...flight.passengers, passenger],
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
        type: ADD_PASSENGER,
        payload: { flightId, passenger },
      });
    } catch (error) {
      console.error("Error adding passenger:", error);
    }
  };
};


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

export const deletePassenger = (flightId, passengerId) => {
  return async (dispatch, getState) => {
    try {
      // Fetch the flight data from the API
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();
  
      // Remove passengers that have an equal id to passengerId
      const updatedPassengers = flight.passengers.filter(
        (p) => p.id.toString() !== passengerId
      );

      const updatedFlight = {
        ...flight,
        passengers: updatedPassengers,
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
      console.log("Flight data updated on server");

      dispatch({
        type: "DELETE_PASSENGER",
        payload: { flightId, passengerId },
      });
    } catch (error) {
      console.error("Error deleting passenger:", error);
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
      const updatedPassengers = [...updatedFlight.passengers];
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
  return async (dispatch, getState) => {
    try {
      // Check passengerId before conversion
      if (typeof passengerId !== "number" && typeof passengerId !== "string") {
        throw new Error(`Invalid passengerId: ${passengerId}`);
      }

      // Convert passengerId to string for consistent comparison
      const stringPassengerId = passengerId.toString();
      console.log("Converted passengerId to string:", stringPassengerId);

      // Get the state to access flights data
      const state = getState();
      console.log("Current state:", state);

      // Ensure flightId is a string before comparison
      const targetFlightId = flightId.toString();

      // Get the flights array from the state
      const { flights } = state.flights || {};
      if (!Array.isArray(flights)) {
        throw new Error("Flights data is not an array or undefined");
      }

      // Find the specific flight by flightId
      const flight = flights.find((f) => f.id === targetFlightId);
      if (!flight) {
        throw new Error(`Flight with ID ${targetFlightId} not found`);
      }

      // Check for the passenger in the flight
      const passenger = flight.passengers.find(
        (p) => p.id.toString() === stringPassengerId
      );
      if (!passenger) {
        throw new Error(`Passenger with ID ${stringPassengerId} not found`);
      }

      // Update the passenger's name
      const updatedPassengers = flight.passengers.map((p) =>
        p.id.toString() === stringPassengerId ? { ...p, name: newName } : p
      );

      // Create the updated flight object
      const updatedFlight = {
        ...flight,
        passengers: updatedPassengers,
      };

      // Update the flight data on the server
      const response = await fetch(
        `http://localhost:3000/flights/${targetFlightId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedFlight),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update flight data");
      }

      // Dispatch the action to update the store
      dispatch({
        type: "UPDATE_PASSENGER_NAME",
        payload: {
          flightId: targetFlightId,
          passengerId: stringPassengerId,
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

      const passenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      const updatedPassenger = {
        ...passenger,
        passport: updatedPassportDetails,
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
        type: UPDATE_PASSPORT_DETAILS,
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
  updatedAddressDetails // Correct spelling of 'Address'
) => {
  return async (dispatch) => {
    try {
      // Fetch the current flight data
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      // Find the specific passenger
      const passenger = flight.passengers.find(
        (passenger) => passenger.id.toString() === passengerId.toString() // Ensure comparison is correct
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      // Create updated passenger object
      const updatedPassenger = {
        ...passenger,
        address: updatedAddressDetails, // Corrected spelling
      };

      // Create the updated flight object
      const updatedFlight = {
        ...flight,
        passengers: flight.passengers.map(
          (p) =>
            p.id.toString() === passengerId.toString() ? updatedPassenger : p // Corrected property access
        ),
      };

      // Send the updated flight data to the server
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

      // Dispatch the action to update the store
      dispatch({
        type: "UPDATE_ADDRESS_DETAILS", // Ensure this type is defined
        payload: {
          flightId,
          passengerId,
          updatedAddressDetails, // Corrected spelling
        },
      });
    } catch (error) {
      console.error("Error updating address details:", error);
    }
  };
};

export const updateAncillaryServices = (
  flightId,
  passengerId,
  updatedAncillaryServices
) => {
  return async (dispatch) => {
    try {
      // Fetch the flight data
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
        ancillaryServices: [
          ...passenger.ancillaryServices,
          updatedAncillaryServices,
        ],
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
        type: UPDATE_ANCILLARY_SERVICES,
        payload: {
          flightId,
          passengerId,
          updatedAncillaryServices,
        },
      });
    } catch (error) {
      console.error("Error updating passenger ancillary Service:", error);
    }
  };
};

export const updateSpecialMeals = (flightId, passengerId, updatedMeals) => {
  return async (dispatch) => {
    try {
      // Fetch the flight data
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
        mealPreference: updatedMeals,
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
        type: UPDATE_SPECIAL_MEALS,
        payload: {
          flightId,
          passengerId,
          updatedMeals,
        },
      });
    } catch (error) {
      console.error("Error updating passenger special meals:", error);
    }
  };
};

export const updateShoppingItems = (
  flightId,
  passengerId,
  updatedShoppingItem
) => {
  return async (dispatch) => {
    try {
      console.log(flightId,passengerId,updatedShoppingItem);
      // Fetch the flight data
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
        inFlightShopRequests: [
          ...passenger.inFlightShopRequests,
          updatedShoppingItem,
        ],
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
        type: UPDATE_SHOPPING_ITEMS,
        payload: {
          flightId,
          passengerId,
          updatedShoppingItem,
        },
      });
    } catch (error) {
      console.error("Error updating passenger Shopping Items:", error);
    }
  };
};

export const deleteAncillaryService = (flightId, passengerId, service) => {
  return async (dispatch) => {
    try {
      // Fetch the flight data
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      // Find the passenger by ID
      const passenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      // Filter out the specified service from ancillary services
      const updatedAncillaryServices = passenger.ancillaryServices.filter(
        (ancService) => ancService !== service
      );

      // Update the passenger's ancillary services
      const updatedPassenger = {
        ...passenger,
        ancillaryServices: updatedAncillaryServices,
      };

      // Update the flight's passengers
      const updatedPassengers = flight.passengers.map((p) =>
        p.id === passengerId ? updatedPassenger : p
      );

      const updatedFlight = {
        ...flight,
        passengers: updatedPassengers,
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

      // Dispatch action to indicate successful deletion of ancillary service
      dispatch({
        type: DELETE_ANCILLARY_SERVICE,
        payload: { flightId, passengerId, updatedAncillaryServices },
      });
    } catch (error) {
      console.error("Error deleting ancillary service:", error);
    }
  };
};

export const deleteShoppingItem = (flightId, passengerId, selectedItem) => {
  return async (dispatch) => {
    try {
      // Fetch the flight data
      const response = await fetch(`http://localhost:3000/flights/${flightId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch flight data");
      }
      const flight = await response.json();

      // Find the passenger by ID
      const passenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (!passenger) {
        throw new Error("Passenger not found");
      }

      // Filter out the specified service from ancillary services
      const updatedShoppingItems = passenger.inFlightShopRequests.filter(
        (shoppingItem) => shoppingItem !== selectedItem
      );

      // Update the passenger's ancillary services
      const updatedPassenger = {
        ...passenger,
        inFlightShopRequests: updatedShoppingItems,
      };

      // Update the flight's passengers
      const updatedPassengers = flight.passengers.map((p) =>
        p.id === passengerId ? updatedPassenger : p
      );

      const updatedFlight = {
        ...flight,
        passengers: updatedPassengers,
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

      // Dispatch action to indicate successful deletion of ancillary service
      dispatch({
        type: DELETE_SHOPPING_ITEM,
        payload: { flightId, passengerId, updatedShoppingItems },
      });
    } catch (error) {
      console.error("Error deleting shopping item:", error);
    }
  };
};
