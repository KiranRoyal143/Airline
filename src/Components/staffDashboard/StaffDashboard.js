import React, { useState } from "react";
import CheckIn from "../CheckIn";
import InFlightManagement from "../InFlightManagement";

function StaffDashboard() {
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div>
      <h1>Staff Dashboard</h1>
      {selectedFlight ? (
        <InFlightManagement selectedFlight={selectedFlight} />
      ) : (
        <CheckIn
          onSelectFlight={handleSelectFlight}
          selectedFlight={selectedFlight}
        />
      )}
    </div>
  );
}

export default StaffDashboard;
