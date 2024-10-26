// PassengerDetails.js
import React from "react";
import { useSelector } from "react-redux";

const PassengerDetails = ({ passengerId }) => {
  const passenger = useSelector((state) => {
    const { flights } = state.flights;
    for (const flight of flights) {
      const foundPassenger = flight.passengers.find(
        (passenger) => passenger.id === passengerId
      );
      if (foundPassenger) return foundPassenger;
    }
    return null;
  });

  if (!passenger) {
    return <div>No passenger found</div>;
  }

  return (
    <div className="passenger-content">
      <h2>Passenger Details</h2>
      <p>
        <strong>Name:</strong> {passenger.name}
      </p>
      <p>
        <strong>Ancillary Services:</strong>{" "}
        {passenger.ancillaryServices.join(", ")}
      </p>
      <p>
        <strong>Seat Number:</strong> {passenger.seatNumber}
      </p>
    </div>
  );
};

export default PassengerDetails;
