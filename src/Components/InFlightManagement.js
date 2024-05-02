import React from "react";
import { useDispatch } from "react-redux";
import SeatMap from "./SeatMap";
import AncillaryServiceList from "./AncillaryServiceList";
import {
  addAncillaryService,
  changeMealPreference,
  addInFlightShopRequest,
} from "../store/actions/flightsActions";
import "./staffDashboard/StaffDashboard.css"

const InFlightManagement = ({ selectedFlight, onBack }) => {
  const dispatch = useDispatch();

  const handleAddAncillaryService = (passengerId, service) => {
    dispatch(addAncillaryService(selectedFlight.id, passengerId, service));
  };

  const handleChangeMealPreference = (passengerId, mealPreference) => {
    dispatch(
      changeMealPreference(selectedFlight.id, passengerId, mealPreference)
    );
  };

  const handleAddInFlightShopRequest = (passengerId, shopRequest) => {
    dispatch(
      addInFlightShopRequest(selectedFlight.id, passengerId, shopRequest)
    );
  };

  return (
    <div className="in-flight">
      <h1>In-Flight Management</h1>
      <div>
        <h3>Flight Details</h3>
        <h3>Selected Flight: {selectedFlight.flightNumber}</h3>
        <h3>Schedule Time: {selectedFlight.scheduleTime}</h3>
      </div>
      <div>
        <SeatMap
          passengers={selectedFlight.passengers}
          flightId={selectedFlight.id}
        />
      </div>
      <div>
        <h3>Ancillary Services Requested</h3>
        {selectedFlight.passengers.map((passenger) => (
          <AncillaryServiceList
            key={passenger.id}
            passengerId={passenger.id}
            flightId={selectedFlight.id}
            onAddAncillaryService={handleAddAncillaryService}
            onChangeMealPreference={handleChangeMealPreference}
            onAddInFlightShopRequest={handleAddInFlightShopRequest}
          />
        ))}
      </div>
    </div>
  );
};

export default InFlightManagement;
