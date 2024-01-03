import React, { useState } from "react";

const PassengerList = ({
  passengers,
  onCheckIn,
  onUndoCheckIn,
  onChangeSeat,
}) => {
  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    const filteredPassengers = passengers.filter((passenger) => {
      const isCheckInFiltered =
        filter === "all" || (filter === "checkedIn" && passenger.isCheckedIn);
      const isWheelchairFiltered =
        filter === "all" ||
        (filter === "wheelchair" && passenger.requiresWheelchair);
      const isInfantFiltered =
        filter === "all" || (filter === "infant" && passenger.hasInfant);

      return isCheckInFiltered || isWheelchairFiltered || isInfantFiltered;
    });

    setFilter(e.target.value);

    return filteredPassengers;
  };

  return (
    <div>
      <h2>Passenger List</h2>
      <div>
        Filter by:
        <select onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="checkedIn">Checked-In</option>
          <option value="notCheckedIn">Not Checked-In</option>
          <option value="wheelchair">Wheelchair</option>
          <option value="infant">Infant</option>
        </select>
      </div>
      <ul>
        {passengers
          .filter((passenger) => {
            if (filter === "all") return true;
            if (filter === "checkedIn") return passenger.isCheckedIn;
            if (filter === "notCheckedIn") return !passenger.isCheckedIn;
            if (filter === "wheelchair") return passenger.requiresWheelchair;
            if (filter === "infant") return passenger.hasInfant;
            return true;
          })
          .map((passenger) => (
            <li key={passenger.id}>
              <strong>Name:</strong> {passenger.name} |{" "}
              <strong>Ancillary Services:</strong>{" "}
              {passenger.ancillaryServices.join(", ")} |{" "}
              <strong>Seat Number:</strong> {passenger.seatNumber} |{" "}
              <button onClick={() => onChangeSeat(passenger)}>
                Change Seat
              </button>{" "}
              | <button onClick={() => onCheckIn(passenger)}>Check-In</button> |{" "}
              <button onClick={() => onUndoCheckIn(passenger)}>
                Undo Check-In
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PassengerList;
