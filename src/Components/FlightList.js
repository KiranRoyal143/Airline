import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlightsRequest } from "../store/actions/flightsActions";

const FlightList = () => {
  const flights = useSelector((state) => state.flights.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlightsRequest());
    // Simulate API call (replace with actual API call)
    setTimeout(() => {
      const dummyFlights = [
        // Your flight data here
      ];
      dispatch(fetchFlightsRequest(dummyFlights));
    }, 5000);
  }, [dispatch]);

  const handleSelectFlight = (flight) => {
    // You can dispatch an action here if needed
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <span>{flight.flightNumber}</span>
            <button onClick={() => handleSelectFlight(flight)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;
