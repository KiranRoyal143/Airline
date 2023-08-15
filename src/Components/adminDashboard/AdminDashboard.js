import React, { useState } from "react";
import FlightList from "../FlightList";
import PassengerList from "../PassengerList";
import AncillaryServiceList from "../AncillaryServiceList";

const AdminDashboard = () => {
  const [flights, setFlights] = useState([
    // Dummy flight data for testing purposes
    {
      id: 1,
      flightNumber: "ABC123",
      scheduleTime: "2023-07-24 10:00",
      passengers: [
        // Add passengers here
      ],
      ancillaryServices: [
        "Extra Legroom",
        "In-flight Meal",
        "Priority Boarding",
        // Add more ancillary services here
      ],
    },
    // Add more flights here
  ]);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [newAncillaryService, setNewAncillaryService] = useState("");

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleAddAncillaryService = () => {
    if (newAncillaryService) {
      setSelectedFlight((prevFlight) => ({
        ...prevFlight,
        ancillaryServices: [...prevFlight.ancillaryServices, newAncillaryService],
      }));
      setNewAncillaryService("");
    }
  };

  const handleDeleteAncillaryService = (service) => {
    setSelectedFlight((prevFlight) => ({
      ...prevFlight,
      ancillaryServices: prevFlight.ancillaryServices.filter((s) => s !== service),
    }));
  };
  
  const handleUpdatePassenger = (updatedPassenger) => {
    // Find the selected passenger in the flights data and update their details
    const updatedFlights = flights.map((flight) => {
      const updatedPassengers = flight.passengers.map((passenger) =>
        passenger.id === updatedPassenger.id ? updatedPassenger : passenger
      );
      return { ...flight, passengers: updatedPassengers };
    });
    
    setFlights(updatedFlights);
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
          <PassengerList passengers={selectedFlight.passengers} onUpdatePassenger={handleUpdatePassenger}/>
          <AncillaryServiceList services={selectedFlight.ancillaryServices} />
          <h3>Ancillary Services</h3>
          <AncillaryServiceList
            services={selectedFlight.ancillaryServices}
            onDeleteService={handleDeleteAncillaryService}
          />
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

