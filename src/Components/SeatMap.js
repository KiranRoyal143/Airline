import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  undoPassengerCheckIn,
  updatePassengerCheckIn,
} from "../store/actions/flightsActions";

const SeatMap = ({ flightId }) => {
  const passengers = useSelector(
    (state) =>
      state.flights.flights.find((flight) => flight.id === flightId).passengers
  );
  const dispatch = useDispatch();

  const handleSeatClick = (passenger) => {
    if (passenger.isCheckedIn) {
      dispatch(undoPassengerCheckIn(flightId, passenger.id)); // Undo check-in
    } else {
      dispatch(updatePassengerCheckIn(flightId, passenger.id)); // Check-in
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
            } ${passenger.requiresWheelchair ? "wheelchair" : ""} ${
              passenger.hasInfant ? "infant" : ""
            }`}
            onClick={() => handleSeatClick(passenger)}
          >
            {passenger.seatNumber}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
