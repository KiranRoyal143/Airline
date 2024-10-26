import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

const ManageSpecialMeals = ({
  passengerId,
  flightId,
  onUpdateSpecialMeals,
  onDeleteSpecialMeals,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight ? flight.passengers : [];

  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === passengerId
  );

  const [newSpecialMeals, setNewSpecialMeals] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");

  const updateSpecialMeals = () => {
    if (newSpecialMeals.trim() !== "") {
      onUpdateSpecialMeals(flightId, passengerId, newSpecialMeals.trim());
      setNewSpecialMeals("");
    }
  };

  const handleDeleteSpecialMeals = () => {
    if (selectedMeal) {
      onDeleteSpecialMeals(flightId, selectedPassenger.id, selectedMeal);
      setSelectedMeal("");
    }
  };

  return (
    <div className="passenger-content">
      <div className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Passenger Name:</strong>
            <span>{selectedPassenger.name}</span>
          </p>
        </div>
      </div>
      <div className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Meal Preference:</strong>
            <span>
              {selectedPassenger.mealPreference.map((meal, index) => (
                <span key={index}>
                  <li>{meal}</li>
                </span>
              ))}
            </span>
          </p>
          <select
            className="select-dropdown"
            value={newSpecialMeals}
            onChange={(e) => setNewSpecialMeals(e.target.value)}
          >
            <option value="" disabled>
              Select Special Meals to Add/Update
            </option>
            {flight.meals.map((meal, index) => (
              <option key={index} value={meal}>
                {meal}
              </option>
            ))}
          </select>
          <button onClick={updateSpecialMeals}>Add/Update Special Meals</button>
        </div>
      </div>
      <div className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Select Meals to Delete:</strong>
          </p>
          <select
            className="select-dropdown"
            value={selectedMeal}
            onChange={(e) => setSelectedMeal(e.target.value)}
          >
            <option value="">Select Special Meal</option>
            {selectedPassenger.mealPreference.map((meal, index) => (
              <option key={index} value={meal}>
                {meal}
              </option>
            ))}
          </select>
          <button onClick={handleDeleteSpecialMeals}>
            Delete Selected Meal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageSpecialMeals;
