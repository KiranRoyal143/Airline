import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlights } from "../store/actions/flightsActions";
import SeatMap from "./SeatMap";

const FlightList = ({ onSelectFlight }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [passengers, setPassengers] = useState([]);

  const flights = useSelector((state) => state.flights.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const selectedFlightId = event.target.value;
    const flight = flights.find(
      (flight) => flight.id === parseInt(selectedFlightId, 10)
    );
    if (flight) {
      setSelectedFlight(flight);
      // Assuming passengers are stored in the flight object
      setPassengers(flight.passengers);
      onSelectFlight(flight);
    }
  };

  return (
    <div>
      <h2>Available Flights</h2>
      <select onChange={handleSelectChange}>
        <option value="">Select a flight</option>
        {flights.map((flight) => (
          <option key={flight.id} value={flight.id}>
            {flight.flightNumber}, {flight.scheduleTime}
          </option>
        ))}
      </select>
      {selectedFlight && (
        <SeatMap passengers={passengers} onSeatSelect={(selectedPassenger) => console.log(selectedPassenger)} />
      )}
    </div>
  );
};

export default FlightList;
