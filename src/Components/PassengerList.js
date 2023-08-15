import React, { useState } from "react";

const PassengerList = ({ passengers, onUpdatePassenger }) => {
  const [filter, setFilter] = useState("all");
  const [showMissingPassport, setShowMissingPassport] = useState(false);
  const [showMissingAddress, setShowMissingAddress] = useState(false);
  const [showMissingDOB, setShowMissingDOB] = useState(false);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [newName, setNewName] = useState("");
  const [newPassport, setNewPassport] = useState("");
  const [newAddress, setNewAddress] = useState("");

  const filteredPassengers = passengers.filter((passenger) => {
    const isCheckInFiltered =
      filter === "all" || (filter === "checkedIn" && passenger.isCheckedIn);
    const isWheelchairFiltered =
      filter === "all" || (filter === "wheelchair" && passenger.requiresWheelchair);
    const isInfantFiltered = filter === "all" || (filter === "infant" && passenger.hasInfant);

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
      setSelectedPassenger(null);
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
          <option value="wheelchair">Wheelchair</option>
          <option value="infant">Infant</option>
        </select>
      </div>
      <div>
        <label>
          Missing Passport:
          <input
            type="checkbox"
            checked={showMissingPassport}
            onChange={() => setShowMissingPassport(!showMissingPassport)}
          />
        </label>
        <label>
          Missing Address:
          <input
            type="checkbox"
            checked={showMissingAddress}
            onChange={() => setShowMissingAddress(!showMissingAddress)}
          />
        </label>
        <label>
          Missing Date of Birth:
          <input
            type="checkbox"
            checked={showMissingDOB}
            onChange={() => setShowMissingDOB(!showMissingDOB)}
          />
        </label>
      </div>
      <ul>
        {filteredPassengers.map((passenger) => (
          <li key={passenger.id}>
            <strong>Name:</strong> {passenger.name} |{" "}
            <strong>Ancillary Services:</strong>{" "}
            {passenger.ancillaryServices.join(", ")} |{" "}
            <strong>Seat Number:</strong> {passenger.seatNumber} |{" "}
            <button onClick={() => setSelectedPassenger(passenger)}>Edit</button>
          </li>
        ))}
      </ul>
      {selectedPassenger && (
        <div>
          <h3>Edit Passenger</h3>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Passport"
            value={newPassport}
            onChange={(e) => setNewPassport(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button onClick={handleUpdatePassenger}>Update Passenger</button>
          <button onClick={() => setSelectedPassenger(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default PassengerList;
