// SeatMap.js
import React from "react";

const SeatMap = ({ passengers, onSeatSelect }) => {
  const handleSeatClick = (passenger) => {
    // If the passenger is already checked-in, undo check-in
    if (passenger.isCheckedIn) {
      onSeatSelect({ ...passenger, isCheckedIn: false });
    } else {
      onSeatSelect(passenger);
    }
  };

  return (
    <div>
      <h2>Seat Map</h2>
      <div className="seat-map">
        {passengers.map((passenger) => (
          <div
            key={passenger.id}
            className={`seat ${passenger.isCheckedIn ? "checked-in" : ""} ${
              passenger.requiresSpecialMeal ? "special-meal" : ""
            }`}
            onClick={() => handleSeatClick(passenger)} // Use the handleSeatClick function here
          >
            {passenger.seatNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;

