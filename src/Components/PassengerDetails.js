import React, { useState } from "react";

const PassengerDetails = ({ passenger, onChangeSeat }) => {
  const [newSeat, setNewSeat] = useState("");
  const handleSeatChange = () => {
    onChangeSeat(passenger, newSeat); // Correct the function call
    setNewSeat("");
  };

  return (
    <div>
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
      <div>
        <input
          type="text"
          placeholder="New Seat Number"
          value={newSeat}
          onChange={(e) => setNewSeat(e.target.value)}
        />
        <button onClick={handleSeatChange}>Change Seat</button>
      </div>
    </div>
  );
};

export default PassengerDetails;
