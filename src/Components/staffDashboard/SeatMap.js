import React from "react";
import { useSelector } from "react-redux";
import "./SeatMap.css";

const SeatMap = ({
  flightId,
  updatePassengerCheckIn,
  undoPassengerCheckIn,
}) => {
  const flight = useSelector((state) =>
    state.flights.flights.find((flight) => flight.id === flightId)
  );
  const { passengers, seatLayout } = flight;

  const handleSeatCheck = (passenger) => {
    if (passenger.isCheckedIn) {
      undoPassengerCheckIn(passenger.id);
    } else {
      updatePassengerCheckIn(passenger.id);
    }
  };
  const getPassengerBySeat = (seatNumber) => {
    return passengers.find((passenger) => passenger.seatNumber === seatNumber);
  };

  return (
    <div className="passenger-content">
      <h2>Seat Map</h2>
      <h3>Flight Id: {flight.flightNumber}</h3>
      <h3>Schedule Time: {flight.scheduleTime}</h3>
      <div className="seat-static-container">
        <div className="seat-static checked-in">A1</div>
        <span className="seat-label">Checked-In</span>

        <div className="seat-static special-meal">A2</div>
        <span className="seat-label">Requires SpecialMeals</span>

        <div className="seat-static wheelchair">A3</div>
        <span className="seat-label">Requires WheelChair</span>

        <div className="seat-static infant">A4</div>
        <span className="seat-label">Infant</span>

        <div className="seat-static">A5</div>
        <span className="seat-label">Nothing Required</span>

        <div className="seat-static empty-seat">A6</div>
        <span className="seat-label">Empty Seat</span>
      </div>
      {seatLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {row.map((seat, seatIndex) => {
            if (!seat) {
              return <div key={seatIndex} className="seat empty-space"></div>;
            }
            const passenger = getPassengerBySeat(seat);
            return (
              <div
                key={seatIndex}
                className={`seat ${passenger ? "" : "empty-seat"} ${
                  passenger?.isCheckedIn ? "checked-in" : ""
                } ${passenger?.mealPreference.length > 0 ? "special-meal" : ""}
 ${passenger?.requiresWheelchair ? "wheelchair" : ""} ${
                  passenger?.hasInfant ? "infant" : ""
                }`}
                onClick={() => passenger && handleSeatCheck(passenger)}
              >
                {seat}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
