import React, { useState } from "react";

const PassengerList = ({
  passengers,
  onCheckIn,
  onUndoCheckIn,
  onChangeSeat,
  onFilter,
  onUpdatePassenger,
}) => {
  const [filter, setFilter] = useState("all");
  const [showMissingPassport, setShowMissingPassport] = useState(false);
  const [showMissingAddress, setShowMissingAddress] = useState(false);
  const [showMissingDOB, setShowMissingDOB] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null); // Initialize to null
  const [newName, setNewName] = useState("");
  const [newPassport, setNewPassport] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const filteredPassengers = passengers.filter((passenger) => {
    const isCheckInFiltered =
      filter === "all" || (filter === "checkedIn" && passenger.isCheckedIn);
    const isWheelchairFiltered =
      filter === "all" ||
      (filter === "wheelchair" && passenger.requiresWheelchair);
    const isInfantFiltered =
      filter === "all" || (filter === "infant" && passenger.hasInfant);

    const isPassportFiltered = !showMissingPassport || passenger.passport;
    const isAddressFiltered = !showMissingAddress || passenger.address;
    const isDOBFiltered = !showMissingDOB || passenger.dateOfBirth;

    return (
      isCheckInFiltered &&
      isWheelchairFiltered &&
      isInfantFiltered &&
      isPassportFiltered &&
      isAddressFiltered &&
      isDOBFiltered
    );
  });

  const handleUpdatePassenger = () => {
    if (selectedPassenger && (newName || newPassport || newAddress)) {
      const updatedPassenger = {
        ...selectedPassenger,
        name: newName || selectedPassenger.name,
        passport: newPassport || selectedPassenger.passport,
        address: newAddress || selectedPassenger.address,
      };

      onUpdatePassenger(updatedPassenger);
      setSelectedPassenger(null); // Reset selected passenger
      setNewName("");
      setNewPassport("");
      setNewAddress("");
    }
  };

  return (
    <div>
      <h2>Passenger List</h2>
      <div>
        Filter by:
        <select onChange={(e) => setFilter(e.target.value)}>
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
            <strong>Seat Number:</strong> {passenger.seatNumber} |{" "}
            <button onClick={() => onChangeSeat(passenger)}>Change Seat</button>{" "}
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
