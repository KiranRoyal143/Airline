import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

const ManageAncillaryServices = ({
  passengerId,
  flightId,
  onUpdateAncillaryServices,
  onUpdateSpecialMeals,
  onUpdateShoppingItems,
  onDeleteAncillaryService,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight ? flight.passengers : [];

  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === passengerId
  );

  const [newAncillaryService, setNewAncillaryService] = useState("");
  const [newSpecialMeals, setNewSpecialMeals] = useState("");
  const [newShoppingItems, setNewShoppingItems] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const updateAncillaryServices = () => {
    if (newAncillaryService.trim() !== "") {
      onUpdateAncillaryServices(passengerId, newAncillaryService.trim());
      setNewAncillaryService("");
    }
  };

  const updateSpecialMeals = () => {
    if (newSpecialMeals.trim() !== "") {
      onUpdateSpecialMeals(passengerId, newSpecialMeals.trim());
      setNewSpecialMeals("");
    }
  };

  const updateShoppingItems = () => {
    if (newShoppingItems.trim() !== "") {
      onUpdateShoppingItems(passengerId, newShoppingItems.trim());
      setNewShoppingItems("");
    }
  };

  const handleDeleteAncillaryService = () => {
    if (selectedService) {
      onDeleteAncillaryService(selectedPassenger.id, selectedService);
      setSelectedService("");
    }
  };

  return (
    <div className="passenger-content">
      <p className="passgen-Details">
        <div className="mng">
          <strong>Passenger Name:</strong>
          <p className="psname">
            <span>{selectedPassenger.name}</span>
          </p>
          <p className="psancillary">
            <strong>Ancillary Services:</strong>
            <span>
              {selectedPassenger.ancillaryServices.map((service) => (
                <option key={selectedPassenger.id} value={selectedPassenger.id}>
                  {service}
                </option>
              ))}
            </span>
          </p>
          <input
            type="text"
            placeholder="Update/Add AncillaryServices"
            value={newAncillaryService}
            onChange={(e) => setNewAncillaryService(e.target.value)}
            className="texts"
          />
          <button onClick={updateAncillaryServices}>
            Add/Update Ancillary Services
          </button>
          <p>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
            >
              <option value="">Select Ancillary Service</option>
              {selectedPassenger.ancillaryServices.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <button onClick={handleDeleteAncillaryService}>
              Delete Selected Service
            </button>
          </p>
        </div>
      </p>
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Special Meals:</strong>
            <span>{selectedPassenger.mealPreference}</span>
          </p>
          <input
            type="text"
            placeholder="Meal Preference"
            value={newSpecialMeals}
            onChange={(e) => setNewSpecialMeals(e.target.value)}
            className="texts"
          />
          <button onClick={updateSpecialMeals}>Add/Update Special Meals</button>
        </div>
      </p>
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Shopping Items:</strong>
            <span>
              {selectedPassenger.inFlightShopRequests.map((shopItem) => (
                <option key={selectedPassenger.id} value={selectedPassenger.id}>
                  {shopItem}
                </option>
              ))}
            </span>
          </p>
          <input
            type="text"
            placeholder="Shopping Items"
            value={newShoppingItems}
            onChange={(e) => setNewShoppingItems(e.target.value)}
            className="texts"
          />
          <button onClick={updateShoppingItems}>
            Add/Update Shopping Items
          </button>
        </div>
      </p>
    </div>
  );
};

export default ManageAncillaryServices;
