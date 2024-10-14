import React, { useState, useEffect } from "react";

const AddAncillaryServices = ({ passengers, onAddAncillaryService }) => {
  const [newAncillaryServices, setNewAncillaryServices] = useState({});

  useEffect(() => {
    if (passengers && passengers.length > 0) {
      const initialServices = passengers.reduce((acc, passenger) => {
        acc[passenger.id] = "";
        return acc;
      }, {});
      setNewAncillaryServices(initialServices);
    }
  }, [passengers]);

  const handleAddAncillaryService = (passengerId) => {
    const service = newAncillaryServices[passengerId]?.trim();
    if (service) {
      onAddAncillaryService(passengerId, service);
      setNewAncillaryServices((prev) => ({ ...prev, [passengerId]: "" }));
    }
  };

  const handleInputChange = (passengerId, value) => {
    setNewAncillaryServices((prev) => ({ ...prev, [passengerId]: value }));
  };

  if (!passengers || passengers.length === 0) {
    return <div>No passengers available</div>;
  }

  return (
    <div className="passenger-content">
      <h2>Passenger Details</h2>
      {passengers.map((passenger) => (
        <div key={passenger.id}>
          <p>
            <strong>Name:</strong> {passenger.name}
          </p>
          <p>
            <strong>Ancillary Services:</strong>{" "}
            {passenger.ancillaryServices.join(", ")}
          </p>
          <p>
            <input
              type="text"
              placeholder="New Ancillary Service"
              value={newAncillaryServices[passenger.id] || ""}
              onChange={(e) => handleInputChange(passenger.id, e.target.value)}
            />
            <button onClick={() => handleAddAncillaryService(passenger.id)}>
              Add Ancillary Service
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default AddAncillaryServices;
