import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../../store/actions/flightsActions";
import "./StaffNavigation.css";

const AddAncillaryServices = ({
  passengers,
  flightId,
  onUpdateAncillaryServices,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);

  const [selectedFlight, setSelectedFlight] = useState(flight);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [newAncillaryService, setNewAncillaryService] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFlight) {
      const updatedFlight = flights.find(
        (flight) => flight.id === selectedFlight.id
      );
      setSelectedFlight(updatedFlight);
    }
  }, [flights, selectedFlight]);

  const updateAncillaryServices = () => {
    if (newAncillaryService.trim() !== "" && selectedPassenger) {
      onUpdateAncillaryServices(
        flightId,
        selectedPassenger.id,
        newAncillaryService.trim()
      );

      const updatedPassenger = {
        ...selectedPassenger,
        ancillaryServices: [
          ...selectedPassenger.ancillaryServices,
          newAncillaryService.trim(),
        ],
      };
      setSelectedPassenger(updatedPassenger);
      setNewAncillaryService("");
    }
  };

  const handlePassengerSelection = (passenger) => {
    setSelectedPassenger(passenger);
  };

  if (!passengers || passengers.length === 0) {
    return <div>No passengers available</div>;
  }

  return (
    <div className="passenger-content">
      <h3>Select a Passenger:</h3>
      <select
        onChange={(e) =>
          handlePassengerSelection(
            passengers.find((p) => p.id === parseInt(e.target.value))
          )
        }
      >
        <option value="">Select a Passenger</option>
        {passengers.map((passenger) => (
          <option key={passenger.id} value={passenger.id}>
            {passenger.name}
          </option>
        ))}
      </select>

      {selectedPassenger && (
        <div className="passgen-Details">
          <div className="mng">
            <div className="psname">
              <strong>Passenger Name:</strong>
              <span>{selectedPassenger.name}</span>
            </div>
            <div className="psname">
              <strong>Ancillary Services:</strong>
              <ul>
                {selectedPassenger.ancillaryServices.length > 0 ? (
                  selectedPassenger.ancillaryServices.map((service, index) => (
                    <li key={index}>{service}</li>
                  ))
                ) : (
                  <li>No services added</li>
                )}
              </ul>
            </div>

            <select
              className="texts"
              value={newAncillaryService}
              onChange={(e) => setNewAncillaryService(e.target.value)}
            >
              <option value="" disabled>
                Select Ancillary Service to Add
              </option>
              {selectedFlight.ancillaryServices.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <button onClick={updateAncillaryServices}>
              Add Ancillary Services
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddAncillaryServices;
