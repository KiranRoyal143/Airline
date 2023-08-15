import React, { useState } from "react";

const PassengerDetails = ({ passenger, onChangeSeat, onAddAncillaryService, onChangeMealPreference, onAddInFlightShopRequest }) => {
  const [newSeat, setNewSeat] = useState("");
  const [newMealPreference, setNewMealPreference] = useState("");
  const [newInFlightShopItem, setNewInFlightShopItem] = useState("");

  const handleSeatChange = () => {
    onChangeSeat(passenger, newSeat);
    setNewSeat("");
  };

  const handleAddAncillaryService = () => {
    const newService = prompt("Enter the name of the new ancillary service:");
    if (newService) {
      onAddAncillaryService(passenger, newService);
    }
  };

  const handleMealPreferenceChange = () => {
    onChangeMealPreference(passenger, newMealPreference);
    setNewMealPreference(""); // Reset the input field after changing the preference
  };

  const handleAddInFlightShopRequest = () => {
    onAddInFlightShopRequest(passenger, newInFlightShopItem);
    setNewInFlightShopItem(""); // Reset the input field after adding the request
  };

  return (
    <div>
      <h2>Passenger Details</h2>
      <p>
        <strong>Name:</strong> {passenger.name}
      </p>
      <p>
        <strong>Ancillary Services:</strong> {passenger.ancillaryServices.join(", ")}
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
      <button onClick={handleAddAncillaryService}>Add Ancillary Service</button>
      <div>
        <input
          type="text"
          value={newMealPreference}
          onChange={(e) => setNewMealPreference(e.target.value)}
          placeholder="Enter new meal preference"
        />
        <button onClick={handleMealPreferenceChange}>Change Meal Preference</button>
        <div>
          <input
            type="text"
            value={newInFlightShopItem}
            onChange={(e) => setNewInFlightShopItem(e.target.value)}
            placeholder="Enter in-flight shop request"
          />
          <button onClick={handleAddInFlightShopRequest}>Add In-Flight Shop Request</button>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;

