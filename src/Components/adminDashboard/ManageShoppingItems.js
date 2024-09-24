import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

const ManageShoppingItems = ({
  passengerId,
  flightId,
  onUpdateShoppingItems,
  onDeleteShoppingItem,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight ? flight.passengers : [];

  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === passengerId
  );

  const [newShoppingItems, setNewShoppingItems] = useState("");
  const [selectedItem, setSelectedItem] = useState("");

  const updateShoppingItems = () => {
    if (newShoppingItems.trim() !== "") {
      onUpdateShoppingItems(flightId, passengerId, newShoppingItems.trim());
      setNewShoppingItems("");
    }
  };

  const handleDeleteShoppingItem = () => {
    if (selectedItem) {
      onDeleteShoppingItem(flightId, selectedPassenger.id, selectedItem);
      setSelectedItem("");
    }
  };

  return (
    <div className="passenger-content">
      <div className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Passenger Name:</strong>
            <span>{selectedPassenger.name}</span>
          </p>
        </div>
      </div>
      <div className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Shopping Items:</strong>
            <span>
              {selectedPassenger.inFlightShopRequests.map((shopItem, index) => (
                <span key={index}>
                  <li>{shopItem}</li>
                </span>
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
      </div>
      <div className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Select Items to Delete:</strong>
          </p>
          <select
            className="texts"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Select Shopping Item</option>
            {selectedPassenger.inFlightShopRequests.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button onClick={handleDeleteShoppingItem}>
            Delete Selected Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageShoppingItems;
