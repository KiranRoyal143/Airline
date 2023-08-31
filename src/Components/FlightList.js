import React from "react";
import { useSelector } from "react-redux";

const FlightList = ({ onSelectFlight }) => {
  const flights = useSelector((state) => state.flights.flights);

  const handleSelectFlight = (flight) => {
    onSelectFlight(flight);
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
