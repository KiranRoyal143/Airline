import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faList } from "@fortawesome/free-solid-svg-icons";
import AddPassenger from "./AddPassenger";
import UpdatePassengerDetails from "./UpdatePassengerDetails";
import ManageAncillaryServices from "./ManageAncillaryServices";
import FilterPassengers from "./FilterPassengers";
import DeletePassenger from "./DeletePassenger";
import ManageSpecialMeals from "./ManageSpecialMeals";
import ManageShoppingItems from "./ManageShoppingItems";

const Navigation = ({
  selectedFlight,
  updatePassengerName,
  handlePassportDetails,
  handleAddressDetails,
  handleAncillaryServices,
  handleSpecialMeals,
  handleDeleteAncillaryServices,
  handleShoppingItems,
  handleDeleteShoppingItem,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [subOption, setSubOption] = useState(null);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const onSelectOption = (option) => {
    setSelectedOption((prevOption) => (prevOption === option ? null : option));
    setSubOption(null);
  };

  const onSelectSubOption = (subOption) => {
    setSubOption(subOption);
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
            <ul>
              <li>
                <button
                  className="side-button"
                  onClick={() => onSelectOption("basicServices")}
                >
                  Manage Passengers
                </button>
                {selectedOption === "basicServices" && (
                  <ul className="sub-options">
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("addPassenger")}
                      >
                        Add Passenger
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("updatePassenger")}
                      >
                        Update Passenger
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("filterPassengers")}
                      >
                        Filter Passengers
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("deletePassenger")}
                      >
                        Delete Passengers
                      </button>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="side-button"
                  onClick={() => onSelectOption("ancillaryServices")}
                >
                  Manage Ancillary Services
                </button>
                {selectedOption === "ancillaryServices" && (
                  <ul className="sub-options">
                    <li>
                      <button
                        className="side-button"
                        onClick={() =>
                          onSelectSubOption("manageAncillaryServices")
                        }
                      >
                        Add/Update/Delete Ancillary Service
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("manageSpecialMeals")}
                      >
                        Add/Update/Delete Special Meals
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("manageShoppingItems")}
                      >
                        Add/Update/Delete Shopping Items
                      </button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="option-content">
        {subOption === "addPassenger" && (
          <AddPassenger selectedFlight={selectedFlight} />
        )}
        {subOption === "updatePassenger" &&
          selectedFlight.passengers.map((passenger) => (
            <UpdatePassengerDetails
              key={passenger.id}
              passengerId={passenger.id}
              flightId={selectedFlight.id}
              onUpdateNameDetails={updatePassengerName}
              onUpdatePassportDetails={handlePassportDetails}
              onUpdateAddressDetails={handleAddressDetails}
            />
          ))}
        {subOption === "filterPassengers" && (
          <FilterPassengers selectedFlight={selectedFlight} />
        )}
        {subOption === "deletePassenger" && (
          <DeletePassenger selectedFlight={selectedFlight.id} />
        )}
        {subOption === "manageAncillaryServices" &&
          selectedFlight.passengers.map((passenger) => (
            <ManageAncillaryServices
              key={passenger.id}
              passengerId={passenger.id}
              flightId={selectedFlight.id}
              onUpdateAncillaryServices={handleAncillaryServices}
              onDeleteAncillaryService={handleDeleteAncillaryServices}
            />
          ))}
        {subOption === "manageSpecialMeals" &&
          selectedFlight.passengers.map((passenger) => (
            <ManageSpecialMeals
              key={passenger.id}
              passengerId={passenger.id}
              flightId={selectedFlight.id}
              onUpdateSpecialMeals={handleSpecialMeals}
            />
          ))}
        {subOption === "manageShoppingItems" &&
          selectedFlight.passengers.map((passenger) => (
            <ManageShoppingItems
              key={passenger.id}
              passengerId={passenger.id}
              flightId={selectedFlight.id}
              onUpdateShoppingItems={handleShoppingItems}
              onDeleteShoppingItem={handleDeleteShoppingItem}
            />
          ))}
      </div>
    </div>
  );
};

export default Navigation;
