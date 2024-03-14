import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassengerSeat } from "../store/actions/flightsActions";

const PassengerList = ({ flightId }) => {
  const passengers = useSelector(
    (state) =>
      state.flights.flights.find((flight) => flight.id === flightId).passengers
  );
  const [filter, setFilter] = useState("all");
  const [seatInputs, setSeatInputs] = useState({});
  const dispatch = useDispatch();

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSeatChange = (passengerId) => {
    const newSeatNumber = seatInputs[passengerId];
    if (newSeatNumber && newSeatNumber.trim() !== "") {
      dispatch(
        changePassengerSeat(flightId, passengerId, newSeatNumber.trim())
      );
      setSeatInputs({
        ...seatInputs,
        [passengerId]: "", // Clear the input after changing the seat
      });
    }
  };

  const filterPassengers = () => {
    return passengers.filter((passenger) => {
      const checkedIn = passenger.isCheckedIn;
      const requiresWheelchair = passenger.requiresWheelchair;
      const hasInfant = passenger.hasInfant;

      switch (filter) {
        case "checkedIn":
          return checkedIn;
        case "notCheckedIn":
          return !checkedIn;
        case "wheelchair":
          return requiresWheelchair;
        case "infant":
          return hasInfant;
        default:
          return true;
      }
    });
  };

  const filteredPassengers = filterPassengers();

  return (
    <div>
      <h2>Passenger List</h2>
      <div>
        Filter by:
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="checkedIn">Checked-In</option>
          <option value="notCheckedIn">Not Checked-In</option>
          <option value="wheelchair">Wheelchair</option>
          <option value="infant">Infant</option>
        </select>
      </div>
      <ul>
        {filteredPassengers.map((passenger) => (
          <li key={passenger.id}>
            <strong>Name:</strong> {passenger.name} |{" "}
            <strong>Ancillary Services:</strong>{" "}
            {passenger.ancillaryServices.join(", ")} |{" "}
            <strong>Seat Number:</strong> {passenger.seatNumber}
            <div>
              <input
                type="text"
                placeholder="New Seat Number"
                value={seatInputs[passenger.id] || ""}
                onChange={(e) =>
                  setSeatInputs({
                    ...seatInputs,
                    [passenger.id]: e.target.value,
                  })
                }
              />
              <button onClick={() => handleSeatChange(passenger.id)}>
                Change Seat
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PassengerList;
