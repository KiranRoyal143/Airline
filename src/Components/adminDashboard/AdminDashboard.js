import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import FlightList from "../FlightList"; // Correct the path if needed
import PassengerList from "../PassengerList"; // Correct the path if needed
import AncillaryServiceList from "../AncillaryServiceList"; // Correct the path if needed
import {
  updatePassengerDetails,
  addAncillaryService,
  deleteAncillaryService,
} from "../../store/actions/flightsActions"; // Correct the path if needed

const AdminDashboard = () => {
  const flights = useSelector((state) => state.flights.flights);
  const dispatch = useDispatch();
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [newAncillaryService, setNewAncillaryService] = useState("");

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleAddAncillaryService = () => {
    if (newAncillaryService) {
      dispatch(addAncillaryService(selectedFlight, newAncillaryService));
      setNewAncillaryService("");
    }
  };

  const handleDeleteAncillaryService = (service) => {
    dispatch(deleteAncillaryService(selectedFlight, service));
  };

  const handleUpdatePassenger = (updatedPassenger) => {
    dispatch(updatePassengerDetails(selectedFlight, updatedPassenger));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {!selectedFlight ? (
        <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
      ) : (
        <div>
          <h2>Selected Flight: {selectedFlight.flightNumber}</h2>
          {/* Display other flight details here */}
          <PassengerList
            passengers={selectedFlight.passengers}
            onUpdatePassenger={handleUpdatePassenger}
          />
          {selectedFlight.ancillaryServices && ( // Check if ancillaryServices exists
            <AncillaryServiceList services={selectedFlight.ancillaryServices} />
          )}
          <h3>Ancillary Services</h3>
          {selectedFlight.ancillaryServices && ( // Check if ancillaryServices exists
            <AncillaryServiceList
              services={selectedFlight.ancillaryServices}
              onDeleteService={handleDeleteAncillaryService}
            />
          )}
          <div>
            <input
              type="text"
              placeholder="New Ancillary Service"
              value={newAncillaryService}
              onChange={(e) => setNewAncillaryService(e.target.value)}
            />
            <button onClick={handleAddAncillaryService}>Add Service</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
