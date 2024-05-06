// Navigation.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import ManagePassengers from "../adminDashboard/ManagePassengers";
import ManageBasicServices from "./ManageBasicServices";
import ManageAncillaryServices from "./ManageAncillaryServices";
import {
  updatePassportDetails,
  updatePassengerName,
  updateAddressDetails,
  updateAncillaryServices,
  updateSpecialMeals,
  updateShoppingItems,
  deleteAncillaryService,
} from "../../store/actions/flightsActions";
import "./Navigation.css";

const Navigation = ({ onSelectOption, selectedOption, selectedFlight }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNameDetails = (passengerId, updatedNameDetails) => {
    dispatch(
      updatePassengerName(selectedFlight.id, passengerId, updatedNameDetails)
    );
  };

  const handlePassportDetails = (passengerId, updatedPassportDetails) => {
    dispatch(
      updatePassportDetails(
        selectedFlight.id,
        passengerId,
        updatedPassportDetails
      )
    );
  };
  const handleAddressDetails = (passengerId, updatedAddressDetails) => {
    dispatch(
      updateAddressDetails(
        selectedFlight.id,
        passengerId,
        updatedAddressDetails
      )
    );
  };
  const handleAncillaryServices = (passengerId, updatedAncillaryServices) => {
    dispatch(
      updateAncillaryServices(
        selectedFlight.id,
        passengerId,
        updatedAncillaryServices
      )
    );
  };
  const handleSpecialMeals = (passengerId, updatedMeals) => {
    dispatch(updateSpecialMeals(selectedFlight.id, passengerId, updatedMeals));
  };
  const handleShoppingItems = (passengerId, updatedShoppingItem) => {
    dispatch(
      updateShoppingItems(selectedFlight.id, passengerId, updatedShoppingItem)
    );
  };
  const handleDeleteAncillaryServices = (passengerId, service) => {
    dispatch(deleteAncillaryService(selectedFlight.id, passengerId, service));
  };
  return (
    <div className="admin-dashboard-container">
      <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
        <div className="toggle-button" onClick={toggleSidebar}>
          {isExpanded ? (
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          ) : (
            <FontAwesomeIcon icon={faList} />
          )}
        </div>
        {isExpanded && (
          <div className="options">
            <div>
              <ul>
                <li>
                  <button
                    className="side-button"
                    onClick={() => onSelectOption("passengers")}
                  >
                    Manage Passengers
                  </button>
                </li>
                <li>
                  <button
                    className="side-button"
                    onClick={() => onSelectOption("basicServices")}
                  >
                    Manage Basic Services
                  </button>
                </li>
                <li>
                  <button
                    className="side-button"
                    onClick={() => onSelectOption("ancillaryServices")}
                  >
                    Manage Ancillary Services
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="option-content">
        {selectedOption === "passengers" && (
          <ManagePassengers selectedFlight={selectedFlight} />
        )}
        {selectedOption === "basicServices" &&
          selectedFlight.passengers.map((passenger) => (
            <ManageBasicServices
              key={passenger.id}
              passengerId={passenger.id}
              flightId={selectedFlight.id}
              onUpdateNameDetails={handleNameDetails}
              onUpdatePassportDetails={handlePassportDetails}
              onUpdateAddressDetails={handleAddressDetails}
            />
          ))}
        {selectedOption === "ancillaryServices" &&
          selectedFlight.passengers.map((passenger) => (
            <ManageAncillaryServices
              key={passenger.id}
              passengerId={passenger.id}
              flightId={selectedFlight.id}
              onUpdateAncillaryServices={handleAncillaryServices}
              onUpdateSpecialMeals={handleSpecialMeals}
              onUpdateShoppingItems={handleShoppingItems}
              onDeleteAncillaryService={handleDeleteAncillaryServices}
            />
          ))}
      </div>
    </div>
  );
};

export default Navigation;
