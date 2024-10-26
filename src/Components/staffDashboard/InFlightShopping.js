import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../../store/actions/flightsActions";
import "../adminDashboard/Navigation.css";

const InFlightShopping = ({
  passengers,
  flightId,
  onAddInFlightShopRequest,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);

  const [selectedFlight, setSelectedFlight] = useState(flight);
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [newShopRequest, setNewShopRequest] = useState("");
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

  const addInFlightShopRequest = () => {
    if (newShopRequest.trim() !== "" && selectedPassenger) {
      onAddInFlightShopRequest(
        flightId,
        selectedPassenger.id,
        newShopRequest.trim()
      );

      const updatedPassenger = {
        ...selectedPassenger,
        inFlightShopRequests: [
          ...selectedPassenger.inFlightShopRequests,
          newShopRequest.trim(),
        ],
      };
      setSelectedPassenger(updatedPassenger);
      setNewShopRequest("");
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
              <strong>Name:</strong> <span>{selectedPassenger.name}</span>
            </div>
            <div className="psname">
              <strong>In-flight Shop Requests:</strong>
              <ul>
                {selectedPassenger.inFlightShopRequests.length > 0 ? (
                  selectedPassenger.inFlightShopRequests.map(
                    (service, index) => <li key={index}>{service}</li>
                  )
                ) : (
                  <li>No services added</li>
                )}
              </ul>
            </div>
            <select
              className="texts"
              value={newShopRequest}
              onChange={(e) => setNewShopRequest(e.target.value)}
            >
              <option value="" disabled>
                Select In Flight Shopping Item to Add
              </option>
              {selectedFlight.shoppingItems.map((service, index) => (
                <option key={index} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <button onClick={addInFlightShopRequest} className="btn">
              Add Shop Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InFlightShopping;
