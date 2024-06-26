import React from "react";
import SeatMap from "./SeatMap";
import PassengerList from "./PassengerList";
import PassengerDetails from "./PassengerDetails";
import { useDispatch } from "react-redux";
import {
  updatePassengerCheckIn,
  undoPassengerCheckIn,
  changePassengerSeat,
} from "../store/actions/flightsActions";

const CheckIn = ({ selectedFlight, onBack }) => {
  const dispatch = useDispatch();
  console.log("Selected Flight:", selectedFlight);

  const handleSeatSelect = (passenger, selectSeat) => {
    if (passenger) {
      dispatch(
        changePassengerSeat(passenger.flightId, passenger.id, selectSeat)
      );
    }
  };

  const handleChangeSeat = (passenger, newSeat) => {
    if (passenger) {
      dispatch(changePassengerSeat(passenger.flightId, passenger.id, newSeat));
    }
  };

  const handleCheckIn = (passenger) => {
    console.log("Selected Flight:", selectedFlight);
    console.log("Selected Passenger:", passenger);
    dispatch(updatePassengerCheckIn(selectedFlight.id, passenger.id)); // Pass flightId and passengerId
  };

  const handleUndoCheckIn = (passenger) => {
    console.log("Selected Flight:", selectedFlight);
    console.log("Selected Passenger:", passenger);
    dispatch(undoPassengerCheckIn(selectedFlight.id, passenger.id)); // Pass flightId and passengerId
  };

  return (
    <div>
      <h1>Airline Staff Check-In</h1>

      {selectedFlight && (
        <div>
          <h2>Selected Flight: {selectedFlight.flightNumber}</h2>
          <h3>Schedule Time: {selectedFlight.scheduleTime}</h3>
          {/* Display other flight details here */}
          <SeatMap
            passengers={selectedFlight.passengers}
            onSeatSelect={handleSeatSelect}
            flightId={selectedFlight.id}
          />
          <PassengerList
            flightId={selectedFlight.id}
            passengers={selectedFlight.passengers}
            onCheckIn={handleCheckIn}
            onUndoCheckIn={handleUndoCheckIn}
            onChangeSeat={handleChangeSeat}
          />

          {selectedFlight.passengers.map((passenger) => (
            <PassengerDetails
              key={passenger.id}
              passengerId={passenger.id}
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
