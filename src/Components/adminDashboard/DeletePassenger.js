import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePassenger } from "../../store/actions/flightsActions";
import "./Navigation.css";

const DeletePassenger = ({ selectedFlight }) => {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flights);
  console.log(flights);
  console.log(selectedFlight);
  const flight = flights.find((flight) => flight.id === selectedFlight);
  console.log(flight);
  const passengers = flight ? flight.passengers : [];
  console.log(passengers);

  const [selectedPassengerId, setSelectedPassengerId] = useState("");

  const handleDeletePassenger = () => {
    if (selectedPassengerId) {
      dispatch(deletePassenger(selectedFlight, selectedPassengerId));
    }
  };

  return (
    <div className="passenger-content">
      <h1>Delete Passenger</h1>
      <div>
        <select
          value={selectedPassengerId}
          onChange={(e) => setSelectedPassengerId(e.target.value)}
          className="select-dropdown"
        >
          <option value="">Select a passenger</option>
          {passengers.map((passenger) => (
            <option key={passenger.id} value={passenger.id}>
              {passenger.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleDeletePassenger}
          className="delete-button"
          disabled={!selectedPassengerId}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeletePassenger;
