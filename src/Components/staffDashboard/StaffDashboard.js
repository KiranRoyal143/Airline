import React, { useState } from "react";
import FlightList from "../FlightList";
import CheckIn from "../CheckIn";
import InFlightManagement from "../InFlightManagement";

function StaffDashboard() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleCheckIn = () => {
    setSelectedTask("checkIn");
  };

  const handleInFlight = () => {
    setSelectedTask("inFlight");
  };

  const handleBackToTaskSelection = () => {
    setSelectedTask(null);
  };

  const handleBackToFlightSelection = () => {
    setSelectedFlight(null);
  };
  return (
    <div>
      {selectedTask === null && (
        <div>
          <h1>Select a Task</h1>
          <button onClick={handleCheckIn}>Check-In</button>
          <button onClick={handleInFlight}>In-Flight Management</button>
        </div>
      )}

      {selectedTask !== null && selectedFlight === null && (
        <div>
          <h1>Select a Flight</h1>
          <FlightList onSelectFlight={handleSelectFlight} />
          <button onClick={handleBackToTaskSelection}>
            Back to Task Selection
          </button>
        </div>
      )}

      {selectedTask === "checkIn" && selectedFlight && (
        <CheckIn
          selectedFlight={selectedFlight}
          onBack={handleBackToFlightSelection}
        />
      )}

      {selectedTask === "inFlight" && selectedFlight && (
        <InFlightManagement
          selectedFlight={selectedFlight}
          onBack={handleBackToFlightSelection}
        />
      )}
    </div>
  );
}

export default StaffDashboard;
