import React from "react";

const FlightList = ({ flights, onSelectFlight }) => {
  return (
    <div>
      <h2>Available Flights</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            <span>{flight.flightNumber}</span>
            <button onClick={() => onSelectFlight(flight)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightList;