import React, { useState, useEffect } from "react";
import FlightList from "../FlightList";
import CheckIn from "../CheckIn";
import InFlightManagement from "../InFlightManagement";
import { fetchFlights } from "../../store/actions/flightsActions";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faAngleDoubleLeft } from "@fortawesome/free-solid-svg-icons";
import "./StaffDashboard.css";

function StaffDashboard() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const flights = useSelector((state) => state.flights.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch flights when the component mounts
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleCheckIn = () => {
    setSelectedTask("checkIn");
  };

  const handleInFlight = () => {
    setSelectedTask("inFlight");
  };

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="staff-dashboard">
      <div className="staffPage_SelectFlight">
        {selectedTask === null && selectedFlight === null && (
          <div>
            <h2>Select a Flight</h2>
            <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
          </div>
        )}
      </div>
      {selectedFlight && (
        <div className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
          <div className="toggle-button" onClick={toggleSidebar}>
            {isExpanded ? (
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            ) : (
              <FontAwesomeIcon icon={faList} />
            )}
          </div>
          {isExpanded && (
            <div>
              <h3>Select A Task</h3>
              <button onClick={handleCheckIn}>Check-In</button>
              <button onClick={handleInFlight}>In-Flight Management</button>
            </div>
          )}
        </div>
      )}
      <div className="staff-option-content">
        {selectedTask === "checkIn" && selectedFlight && (
          <CheckIn selectedFlight={selectedFlight} />
        )}

        {selectedTask === "inFlight" && selectedFlight && (
          <InFlightManagement selectedFlight={selectedFlight} />
        )}
      </div>
    </div>
  );
}

export default StaffDashboard;
