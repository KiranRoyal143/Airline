import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

const ManageSpecialMeals = ({
  passengerId,
  flightId,
  onUpdateSpecialMeals,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight ? flight.passengers : [];

  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === passengerId
  );

  const [newSpecialMeals, setNewSpecialMeals] = useState("");

  const updateSpecialMeals = () => {
    if (newSpecialMeals.trim() !== "") {
      onUpdateSpecialMeals(flightId, passengerId, newSpecialMeals.trim());
      setNewSpecialMeals("");
    }
  };
  return (
    <div className="passenger-content">
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Passenger Name:</strong>
            <span>{selectedPassenger.name}</span>
          </p>
        </div>
      </p>
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Special Meals:</strong>
            {selectedPassenger.mealPreference}
          </p>
          <input
            type="text"
            placeholder="Meal Preference"
            value={newSpecialMeals}
            onChange={(e) => setNewSpecialMeals(e.target.value)}
            className="texts"
          />
          <button onClick={updateSpecialMeals}>Add/Update Special Meals</button>
        </div>
      </p>
    </div>
  );
};

export default ManageSpecialMeals;
