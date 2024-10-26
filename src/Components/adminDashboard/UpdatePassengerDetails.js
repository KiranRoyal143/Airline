import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

const UpdatePassengerDetails = ({
  passengerId,
  flightId,
  onUpdateNameDetails,
  onUpdatePassportDetails,
  onUpdateAddressDetails,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight ? flight.passengers : [];

  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === passengerId
  );


  const [newName, setNewName] = useState("");
  const [newPassportDetails, setNewPassportDetails] = useState("");
  const [newAddressDetails, setNewAddressDetails] = useState("");

  const updateName = () => {
    if (newName.trim() !== "") {
      onUpdateNameDetails(flightId, passengerId, newName.trim());
      setNewName("");
    }
  };

  const updatePassportDetails = () => {
    if (newPassportDetails.trim() !== "") {
      onUpdatePassportDetails(flightId, passengerId, newPassportDetails.trim());
      setNewPassportDetails("");
    }
  };

  const updateAddressDetails = () => {
    if (newAddressDetails.trim() !== "") {
      onUpdateAddressDetails(flightId, passengerId, newAddressDetails.trim());
      setNewAddressDetails("");
    }
  };

  if (!selectedPassenger) {
    return <div>Loading...</div>;
  }

  return (
    <div className="passenger-content">
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Passenger Name:</strong>
            <span>{selectedPassenger.name}</span>
          </p>
          <input
            type="text"
            placeholder="Update/Add Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="texts"
          />
          <button onClick={updateName}>Add/Update Name</button>
        </div>
      </p>
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Passport Details:</strong>
            <span>{selectedPassenger.passport}</span>
          </p>
          <input
            type="text"
            placeholder="Update/Add Passport Details"
            value={newPassportDetails}
            onChange={(e) => setNewPassportDetails(e.target.value)}
            className="texts"
          />
          <button onClick={updatePassportDetails}>
            Add/Update Passport Details
          </button>
        </div>
      </p>
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Address Details:</strong>
            <span>{selectedPassenger.address}</span>
          </p>
          <input
            type="text"
            placeholder="Update/Add Address Details"
            value={newAddressDetails}
            onChange={(e) => setNewAddressDetails(e.target.value)}
            className="texts"
          />
          <button onClick={updateAddressDetails}>
            Add/Update Address Details
          </button>
        </div>
      </p>
    </div>
  );
};

export default UpdatePassengerDetails;
