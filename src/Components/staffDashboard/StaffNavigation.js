import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faList } from "@fortawesome/free-solid-svg-icons";
import SeatMap from "./SeatMap";
import PassengerList from "./PassengerList";
import AncillaryServices from "./AncillaryServices";
import AddAncillaryServices from "./AddAncillaryServices";
import UpdateMealPreference from "./UpdateMealPreference";
import InFlightShopping from "./InFlightShopping";

const StaffNavigation = ({
  selectedFlight,
  updatePassengerCheckIn,
  undoPassengerCheckIn,
  changePassengerSeat,
  addAncillaryService,
  changeMealPreference,
  addInFlightShopRequest,
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

  if (!selectedFlight) {
    return null;
  }

  return (
    <div className="staff-dashboard-container">
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
                  onClick={() => onSelectOption("checkIn")}
                >
                  Check-In
                </button>
                {selectedOption === "checkIn" && (
                  <ul className="sub-options">
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("seatMap")}
                      >
                        Seat Map
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
                  </ul>
                )}
              </li>
              <li>
                <button
                  className="side-button"
                  onClick={() => onSelectOption("inFlight")}
                >
                  In-Flight
                </button>
                {selectedOption === "inFlight" && (
                  <ul className="sub-options">
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("seatMap")}
                      >
                        Seat Map
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("ancillaryServices")}
                      >
                        Ancillary Services
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() =>
                          onSelectSubOption("addAncillaryServices")
                        }
                      >
                        Add Ancillary Services
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() =>
                          onSelectSubOption("updateMealPreference")
                        }
                      >
                        Update Meal Preference
                      </button>
                    </li>
                    <li>
                      <button
                        className="side-button"
                        onClick={() => onSelectSubOption("inFlightShop")}
                      >
                        In-Flight Shop
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
        {subOption === "seatMap" && (
          <SeatMap
            passengers={selectedFlight.passengers}
            updatePassengerCheckIn={updatePassengerCheckIn}
            undoPassengerCheckIn={undoPassengerCheckIn}
            flightId={selectedFlight.id}
          />
        )}
        {subOption === "filterPassengers" && (
          <PassengerList
            flightId={selectedFlight.id}
            passengers={selectedFlight.passengers}
            onCheckIn={updatePassengerCheckIn}
            onUndoCheckIn={undoPassengerCheckIn}
            onChangeSeat={changePassengerSeat}
          />
        )}
        {subOption === "ancillaryServices" && (
          <AncillaryServices passengers={selectedFlight.passengers} />
        )}
        {subOption === "addAncillaryServices" && (
          <AddAncillaryServices
            passengers={selectedFlight.passengers}
            flightId={selectedFlight.id}
            onUpdateAncillaryServices={addAncillaryService}
          />
        )}
        {subOption === "updateMealPreference" && (
          <UpdateMealPreference
            passengers={selectedFlight.passengers}
            flightId={selectedFlight.id}
            onChangeMealPreference={changeMealPreference}
          />
        )}
        {subOption === "inFlightShop" && (
          <InFlightShopping
            passengers={selectedFlight.passengers}
            flightId={selectedFlight.id}
            onAddInFlightShopRequest={addInFlightShopRequest}
          />
        )}
      </div>
    </div>
  );
};

export default StaffNavigation;
