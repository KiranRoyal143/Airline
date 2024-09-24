import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./Navigation.css";

const ManageAncillaryServices = ({
  passengerId,
  flightId,
  onUpdateAncillaryServices,
  onDeleteAncillaryService,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const passengers = flight ? flight.passengers : [];

  const selectedPassenger = passengers.find(
    (passenger) => passenger.id === passengerId
  );

  const [newAncillaryService, setNewAncillaryService] = useState("");
  const [selectedService, setSelectedService] = useState("");

  const updateAncillaryServices = () => {
    if (newAncillaryService.trim() !== "") {
      onUpdateAncillaryServices(
        flightId,
        passengerId,
        newAncillaryService.trim()
      );
      setNewAncillaryService("");
    }
  };

  const handleDeleteAncillaryService = () => {
    if (selectedService) {
      onDeleteAncillaryService(flightId, selectedPassenger.id, selectedService);
      setSelectedService("");
    }
  };

  return (
    <div className="passenger-content">
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <strong>Passenger Name:</strong>
            <span>{selectedPassenger.name}</span>
          </p>
        </div>
        <p className="passgen-Details">
          <div className="mng">
            <p className="psname">
              <strong>Ancillary Services:</strong>
              <span>
                {selectedPassenger.ancillaryServices.map((service, index) => (
                  <span key={index}>
                    <li>{service}</li>
                  </span>
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
          </div>
        </p>
        <p className="passgen-Details">
          <div className="mng">
            <p className="psname">
              <strong>Select Service to Delete:</strong>
            </p>
            <select
              className="texts"
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
          </div>
        </p>
      </p>
    </div>
  );
};

export default ManageAncillaryServices;
