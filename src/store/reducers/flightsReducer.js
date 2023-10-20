import {
  FETCH_FLIGHTS_SUCCESS,
  FETCH_FLIGHTS_FAILURE,
  ADD_ANCILLARY_SERVICE,
  DELETE_ANCILLARY_SERVICE,
  UPDATE_PASSENGER_DETAILS,
  UPDATE_PASSENGER_CHECK_IN,
  UNDO_PASSENGER_CHECK_IN,
} from "../actions/flightsActions";

const initialState = {
  flights: [
    {
      id: 1,
      flightNumber: "ABC123",
      scheduleTime: "2023-07-24 10:00",
      passengers: [
        {
          id: 1,
          name: "John Doe",
          ancillaryServices: ["Extra Legroom", "In-flight Meal"],
          seatNumber: "1A",
          isCheckedIn: true,
          requiresWheelchair: false,
          hasInfant: false,
        },
        {
          id: 2,
          name: "Jane Smith",
          ancillaryServices: ["Priority Boarding"],
          seatNumber: "1B",
          isCheckedIn: false,
          requiresWheelchair: true,
          hasInfant: false,
        },
        // Add more passengers for this flight
      ],

      // Add more flights here
    },
    {
      id: 2,
      flightNumber: "ABC1234",
      scheduleTime: "2023-07-24 11:00",
      passengers: [
        {
          id: 1,
          name: "John",
          ancillaryServices: ["Extra Legroom", "In-flight Meal"],
          seatNumber: "1A",
          isCheckedIn: true,
          requiresWheelchair: false,
          hasInfant: false,
        },
        {
          id: 2,
          name: "Smith",
          ancillaryServices: ["Priority Boarding"],
          seatNumber: "1B",
          isCheckedIn: false,
          requiresWheelchair: true,
          hasInfant: false,
        },
        // Add more passengers for this flight
      ],
    },
  ],
  // Initialize with an empty array
  loading: false,
  error: null,
};

const addAncillaryServiceReducer = (state, payload) => {
  const { flight, service } = payload;
  const updatedFlights = state.flights.map((f) =>
    f.id === flight.id
      ? {
          ...f,
          passengers: f.passengers.map((p) =>
            p.id === flight.id
              ? { ...p, ancillaryServices: [...p.ancillaryServices, service] }
              : p
          ),
        }
      : f
  );

  return {
    ...state,
    flights: updatedFlights,
  };
};

const deleteAncillaryServiceReducer = (state, payload) => {
  const { flight, service } = payload;
  const updatedFlights = state.flights.map((f) =>
    f.id === flight.id
      ? {
          ...f,
          passengers: f.passengers.map((p) => ({
            ...p,
            ancillaryServices: p.ancillaryServices.filter((s) => s !== service),
          })),
        }
      : f
  );

  return {
    ...state,
    flights: updatedFlights,
  };
};

const updatePassengerDetailsReducer = (state, payload) => {
  // Implement the logic to update passenger details
  // Return the updated state
  const { flight, updatedPassenger } = payload;

  // Update passenger details logic
  const updatedFlights = state.flights.map((f) =>
    f.id === flight.id
      ? {
          ...f,
          passengers: f.passengers.map((p) =>
            p.id === updatedPassenger.id ? { ...p, ...updatedPassenger } : p
          ),
        }
      : f
  );

  // Return the updated state
  return {
    ...state,
    flights: updatedFlights,
  };
};

// Corrected updatePassengerCheckInReducer function
const updatePassengerCheckInReducer = (state, payload) => {
  console.log("Update Passenger Check-In Reducer Called", payload);
  const { flightId, passengerId } = payload;

  // Find the selected flight by flightId
  const selectedFlight = state.flights.find((flight) => flight.id === flightId);

  if (selectedFlight) {
    // Find the passenger by passengerId within the selected flight
    const updatedPassengers = selectedFlight.passengers.map((passenger) => {
      if (passenger.id === passengerId) {
        // Update the isCheckedIn property for the correct passenger
        return { ...passenger, isCheckedIn: true };
      }
      return passenger;
    });

    // Update the selected flight with the updated passenger list
    const updatedFlight = {
      ...selectedFlight,
      passengers: updatedPassengers,
    };

    // Create an updated array of flights
    const updatedFlights = state.flights.map((flight) => {
      if (flight.id === flightId) {
        return updatedFlight;
      }
      return flight;
    });

    console.log("Updated State in checkInReducer:", updatedFlights);

    // Return the updated state
    return {
      ...state,
      flights: updatedFlights,
    };
  }

  // If the selected flight or passenger is not found, return the original state
  return state;
};

// Corrected undoPassengerCheckInReducer function
const undoPassengerCheckInReducer = (state, payload) => {
  console.log("Update Passenger undo Check-In Reducer Called", payload);
  const { flightId, passengerId } = payload;

  // Find the selected flight by flightId
  const selectedFlight = state.flights.find((flight) => flight.id === flightId);

  if (selectedFlight) {
    // Find the passenger by passengerId within the selected flight
    const updatedPassengers = selectedFlight.passengers.map((passenger) => {
      if (passenger.id === passengerId) {
        // Update the isCheckedIn property for the correct passenger
        return { ...passenger, isCheckedIn: false };
      }
      return passenger;
    });

    // Update the selected flight with the updated passenger list
    const updatedFlight = {
      ...selectedFlight,
      passengers: updatedPassengers,
    };

    // Create an updated array of flights
    const updatedFlights = state.flights.map((flight) => {
      if (flight.id === flightId) {
        return updatedFlight;
      }
      return flight;
    });

    console.log("Updated State in undo checkInReducer:", updatedFlights);
    // Return the updated state
    return {
      ...state,
      flights: updatedFlights,
    };
  }

  // If the selected flight or passenger is not found, return the original state
  return state;
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
    case ADD_ANCILLARY_SERVICE:
      return addAncillaryServiceReducer(state, action.payload);
    case DELETE_ANCILLARY_SERVICE:
      return deleteAncillaryServiceReducer(state, action.payload);
    case UPDATE_PASSENGER_DETAILS:
      return updatePassengerDetailsReducer(state, action.payload);
    case UPDATE_PASSENGER_CHECK_IN:
      return updatePassengerCheckInReducer(state, action.payload);
    case UNDO_PASSENGER_CHECK_IN:
      return undoPassengerCheckInReducer(state, action.payload);
    default:
      return state;
  }
};

export default flightsReducer;
