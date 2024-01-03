import React from "react";
import { useSelector } from "react-redux";

const FlightList = ({ onSelectFlight }) => {
  const flights = useSelector((state) => state.flights.flights);

  const handleSelectChange = (event) => {
    const selectedFlightId = event.target.value;
    const selectedFlight = flights.find(
      (flight) => flight.id === parseInt(selectedFlightId, 10)
    );
    if (selectedFlight) {
      onSelectFlight(selectedFlight);
    }
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <select onChange={handleSelectChange}>
        <option value="">Select a flight</option>
        {flights.map((flight) => (
          <option key={flight.id} value={flight.id}>
            {flight.flightNumber},{flight.scheduleTime}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FlightList;
