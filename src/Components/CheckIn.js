import React, { useState, useEffect } from "react";
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
  const [filteredPassengers, setFilteredPassengers] = useState([]);

  const filterPassengers = (filterCriteria) => {
    if (!selectedFlight) return;

    let filtered = selectedFlight.passengers;

    if (filterCriteria === "checkedIn") {
      filtered = selectedFlight.passengers.filter(
        (passenger) => passenger.isCheckedIn
      );
    } else if (filterCriteria === "notCheckedIn") {
      filtered = selectedFlight.passengers.filter(
        (passenger) => !passenger.isCheckedIn
      );
    } else if (filterCriteria === "wheelchair") {
      filtered = selectedFlight.passengers.filter(
        (passenger) => passenger.requiresWheelchair
      );
    } else if (filterCriteria === "infant") {
      filtered = selectedFlight.passengers.filter(
        (passenger) => passenger.hasInfant
      );
    }

    setFilteredPassengers(filtered);
  };

  const handleSeatSelect = (passenger, selectSeat) => {
    // Implement your logic here to select a seat
    dispatch(changePassengerSeat(passenger.flightId, passenger.id, selectSeat));
  };
  const handleChangeSeat = (passenger, newSeat) => {
    // Implement your logic here to change passenger seat
    dispatch(changePassengerSeat(passenger.flightId, passenger.id, newSeat));
  };

  const handleCheckIn = (passenger) => {
    // Filter passengers who are already checked-in
    const updatedPassengers = selectedFlight.passengers.map((p) =>
      p.id === passenger.id ? { ...p, isCheckedIn: true } : p
    );

    // Update the selected flight's passenger list with the updated passengers
    const updatedFlight = { ...selectedFlight, passengers: updatedPassengers };

    // Dispatch the action to update the passenger's check-in status
    dispatch(updatePassengerCheckIn(updatedFlight));
  };

  const handleUndoCheckIn = (passenger) => {
    // Filter passengers who are not checked-in
    const updatedPassengers = selectedFlight.passengers.map((p) =>
      p.id === passenger.id ? { ...p, isCheckedIn: false } : p
    );

    // Update the selected flight's passenger list with the updated passengers
    const updatedFlight = { ...selectedFlight, passengers: updatedPassengers };

    // Dispatch the action to undo the passenger's check-in status
    dispatch(undoPassengerCheckIn(updatedFlight)); // Dispatch the action with the updatedFlight object
  };

  return (
    <div>
      <h1>Airline Staff Check-In</h1>

      {selectedFlight && (
        <div>
          <h2>Selected Flight: {selectedFlight.flightNumber}</h2>
          {/* Display other flight details here */}
          <SeatMap
            passengers={selectedFlight.passengers}
            onSeatSelect={handleSeatSelect}
          />
          <PassengerList
            passengers={selectedFlight.passengers}
            onCheckIn={handleCheckIn}
            onUndoCheckIn={handleUndoCheckIn}
            onChangeSeat={handleChangeSeat}
          />

          {selectedFlight.passengers.map((passenger) => (
            <PassengerDetails
              key={passenger.id}
              passenger={passenger}
              onCheckIn={handleCheckIn}
              onUndoCheckIn={handleUndoCheckIn}
              onChangeSeat={handleChangeSeat}
            />
          ))}
          <h3>Passenger Filters</h3>
          <button onClick={() => filterPassengers("checkedIn")}>
            Checked-In
          </button>
          <button onClick={() => filterPassengers("notCheckedIn")}>
            Not Checked-In
          </button>
          <button onClick={() => filterPassengers("wheelchair")}>
            Wheelchair
          </button>
          <button onClick={() => filterPassengers("infant")}>Infant</button>
        </div>
      )}
      <div>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default CheckIn;
