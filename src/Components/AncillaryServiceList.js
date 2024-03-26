import React, { useState } from "react";
import { useSelector } from "react-redux";

const AncillaryServiceList = ({
  passengerId,
  flightId,
  onAddAncillaryService,
  onChangeMealPreference,
  onAddInFlightShopRequest,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight ? flight.passengers : [];

  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === passengerId
  );

  console.log("Selected Passenger:", selectedPassenger);

  const [newAncillaryService, setNewAncillaryService] = useState("");
  const [newMealPreference, setNewMealPreference] = useState("");
  const [newShopRequest, setNewShopRequest] = useState("");

  if (!selectedPassenger || !selectedPassenger.ancillaryServices) {
    return <div>No passenger or ancillary services found</div>;
  }

  const handleAddAncillaryService = () => {
    if (newAncillaryService.trim() !== "") {
      onAddAncillaryService(passengerId, newAncillaryService.trim());
      setNewAncillaryService("");
    }
  };

  const handleChangeMealPreference = () => {
    if (newMealPreference.trim() !== "") {
      onChangeMealPreference(passengerId, newMealPreference.trim());
      setNewMealPreference("");
    }
  };

  const handleAddInFlightShopRequest = () => {
    if (newShopRequest.trim() !== "") {
      onAddInFlightShopRequest(passengerId, newShopRequest.trim());
      setNewShopRequest("");
    }
  };

  return (
    <div>
      <h2>Passenger Details</h2>
      <p>
        <strong>Name:</strong> {selectedPassenger.name}
      </p>
      <p>
        <strong>Ancillary Services:</strong>{" "}
        {selectedPassenger.ancillaryServices.join(", ")}
        <p>
          <input
            type="text"
            placeholder="New Ancillary Service"
            value={newAncillaryService}
            onChange={(e) => setNewAncillaryService(e.target.value)}
          />
          <button onClick={handleAddAncillaryService}>
            Add Ancillary Service
          </button>
        </p>
      </p>
      <p>
        <strong>Meal Preference:</strong> {selectedPassenger.mealPreference}
        <p>
          <input
            type="text"
            placeholder="New Meal Preference"
            value={newMealPreference}
            onChange={(e) => setNewMealPreference(e.target.value)}
          />
          <button onClick={handleChangeMealPreference}>
            Change Meal Preference
          </button>
        </p>
      </p>
      <p>
        <strong>In-flight Shop Requests:</strong>{" "}
        {selectedPassenger.inFlightShopRequests.join(", ")}
        <p>
          <input
            type="text"
            placeholder="New Shop Request"
            value={newShopRequest}
            onChange={(e) => setNewShopRequest(e.target.value)}
          />
          <button onClick={handleAddInFlightShopRequest}>
            Add Shop Request
          </button>
        </p>
      </p>
    </div>
  );
};

export default AncillaryServiceList;
