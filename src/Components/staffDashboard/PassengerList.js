import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassengerSeat } from "../../store/actions/flightsActions";
import "../adminDashboard/Navigation.css"

const PassengerList = ({ flightId }) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight.passengers;
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
        [passengerId]: "",
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

  const getAvailableSeats = () => {
    const allSeats = flight.seatLayout.flat().filter((seat) => seat !== "");
    const assignedSeats = passengers.map((passenger) => passenger.seatNumber);
    return allSeats.filter((seat) => !assignedSeats.includes(seat));
  };

  const filteredPassengers = filterPassengers();
  const availableSeats = getAvailableSeats();

  return (
    <div className="passenger-content">
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
              <select
                className="select-dropdown"
                value={seatInputs[passenger.id] || ""}
                onChange={(e) =>
                  setSeatInputs({
                    ...seatInputs,
                    [passenger.id]: e.target.value,
                  })
                }
              >
                <option value="">Select New Seat</option>
                {availableSeats.map((seat, index) => (
                  <option key={index} value={seat}>
                    {seat}
                  </option>
                ))}
              </select>
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
