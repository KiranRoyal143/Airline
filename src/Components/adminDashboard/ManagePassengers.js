import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

const ManagePassengers = ({ selectedFlight }) => {
  const passengers = useSelector(
    (state) =>
      state.flights.flights.find((flight) => flight.id === selectedFlight.id)
        .passengers
  );

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filterPassengers = () => {
    return passengers.filter((passenger) => {
      const passport = passenger.passport;
      const address = passenger.address;
      const dob = passenger.dob;

      switch (filter) {
        case "passport":
          return !passport;
        case "address":
          return !address;
        case "dob":
          return !dob;
        default:
          return true;
      }
    });
  };

  const filteredPassengers = filterPassengers();

  return (
    <div className="passenger-content">
      <h2>Passenger List</h2>
      <div>
        Filter by:
        <select value={filter} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="passport">Missing-Passport</option>
          <option value="address">Missing-Address</option>
          <option value="dob">Missing-DateOfBirth</option>
        </select>
      </div>
      <ul>
        {filteredPassengers.map((passenger) => (
          <li key={passenger.id}>
            <strong>Name:</strong> {passenger.name} |{" "}
            <strong>Ancillary Services:</strong>{" "}
            {passenger.ancillaryServices.join(", ")} |{" "}
            <strong>Seat Number:</strong> {passenger.seatNumber}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManagePassengers;
