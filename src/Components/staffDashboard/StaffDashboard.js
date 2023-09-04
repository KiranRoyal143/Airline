import React, { useState } from "react";
import FlightList from "../FlightList";
import CheckIn from "../CheckIn";
import InFlightManagement from "../InFlightManagement";

function StaffDashboard() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [page, setPage] = useState("selectFlight");

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
    setPage("selectTask");
  };

  const handleCheckIn = () => {
    setPage("checkIn");
  };

  const handleInFlight = () => {
    setPage("inFlight");
  };

  const handleBackToTaskSelection = () => {
    setPage("selectTask");
  };
  const handleBackToFlightSelection = () => {
    setSelectedFlight(null);
    setPage("selectFlight");
  };

  return (
    <div>
      {page === "selectFlight" && (
        <div>
          <h1>Staff Dashboard</h1>
          <FlightList onSelectFlight={handleSelectFlight} />
        </div>
      )}

      {page === "selectTask" && (
        <div>
          <h1>Select a Task</h1>
          <button onClick={handleCheckIn}>Check-In</button>
          <button onClick={handleInFlight}>In-Flight Management</button>
          {selectedFlight && (
            <button onClick={handleBackToFlightSelection}>
              Back to Flight Selection
            </button>
          )}
        </div>
      )}

      {page === "checkIn" && selectedFlight && (
        <CheckIn
          selectedFlight={selectedFlight}
          onBack={handleBackToTaskSelection}
        />
      )}

      {page === "inFlight" && selectedFlight && (
        <InFlightManagement
          selectedFlight={selectedFlight}
          onBack={handleBackToTaskSelection}
        />
      )}
    </div>
  );
}

export default StaffDashboard;
