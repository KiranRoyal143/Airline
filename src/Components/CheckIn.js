// CheckIn.js
import React, { useState } from "react";
import FlightList from "./FlightList";
import SeatMap from "./SeatMap";
import PassengerList from "./PassengerList";
import PassengerDetails from "./PassengerDetails";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassengerCheckIn,
  undoPassengerCheckIn,
} from "../store/actions/flightsActions";

const CheckIn = ({ onSelectFlight, selectedFlight }) => {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flights);

  const handleSeatSelect = (selectedPassenger) => {
    // Implement your logic here to update passenger details
  };

  const handleChangeSeat = (passenger, newSeat) => {
    // Implement your logic here to change passenger seat
  };

  const handleCheckIn = (passenger) => {
    dispatch(updatePassengerCheckIn(passenger.flightId, passenger.id));
  };

  const handleUndoCheckIn = (passenger) => {
    dispatch(undoPassengerCheckIn(passenger.flightId, passenger.id));
  };

  return (
    <div>
      <h1>Airline Staff Check-In</h1>
      {flights.length > 0 ? (
        <FlightList flights={flights} onSelectFlight={onSelectFlight} />
      ) : (
        <p>Loading flights...</p>
      )}

      {selectedFlight && (
        <div>
          <h2>Selected Flight: {selectedFlight.flightNumber}</h2>
          {/* Display other flight details here */}
          <SeatMap
            passengers={selectedFlight.passengers}
            onSeatSelect={handleSeatSelect}
          />
          <PassengerList passengers={selectedFlight.passengers} />

          {selectedFlight.passengers.map((passenger) => (
            <PassengerDetails
              key={passenger.id}
              passenger={passenger}
              onCheckIn={handleCheckIn}
              onUndoCheckIn={handleUndoCheckIn}
              onChangeSeat={handleChangeSeat}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckIn;
