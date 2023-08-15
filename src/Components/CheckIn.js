// CheckIn.js
import React, { useState } from "react";
import FlightList from "./FlightList";
import SeatMap from "./SeatMap";
import PassengerList from "./PassengerList";
import PassengerDetails from "./PassengerDetails";

const CheckIn = () => {
  // Dummy flight data for testing purposes
  const [flights] = useState([
    {
      id: 1,
      flightNumber: "ABC123",
      scheduleTime: "2023-07-24 10:00",
      passengers: [
        {
          id: 1,
          name: "John Doe",
          ancillaryServices: ["Extra Legroom", "In-flight Meal"],
          seatNumber: "1A",
          isCheckedIn: true,
          requiresWheelchair: false,
          hasInfant: false,
        },
        {
          id: 2,
          name: "Jane Smith",
          ancillaryServices: ["Priority Boarding"],
          seatNumber: "1B",
          isCheckedIn: false,
          requiresWheelchair: true,
          hasInfant: false,
        },
        // Add more passengers for this flight
      ],
    },
    // Add more flights here
  ]);

  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  // Add the missing functions here
  const handleSeatSelect = (selectedPassenger) => {
    const updatedPassengers = selectedFlight.passengers.map((passenger) =>
      passenger.id === selectedPassenger.id
        ? { ...passenger, isCheckedIn: !passenger.isCheckedIn }
        : passenger
    );

    setSelectedFlight({ ...selectedFlight, passengers: updatedPassengers });
  };

  const handleChangeSeat = (passenger, newSeat) => {
    if (newSeat !== passenger.seatNumber) {
      // Check if the new seat is not the same as the current seat
      const updatedPassengers = selectedFlight.passengers.map((p) =>
        p.id === passenger.id ? { ...p, seatNumber: newSeat } : p
      );
      setSelectedFlight({ ...selectedFlight, passengers: updatedPassengers });
    }
  };

  return (
    <div>
      <h1>Airline Staff Check-In</h1>
      {!selectedFlight ? (
        <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
      ) : (
        <div>
          <h2>Selected Flight: {selectedFlight.flightNumber}</h2>
          {/* Display other flight details here */}
          <SeatMap passengers={selectedFlight.passengers} onSeatSelect={handleSeatSelect} />
          <PassengerList passengers={selectedFlight.passengers} />
          {selectedFlight.passengers.map((passenger) => (
            <PassengerDetails key={passenger.id} passenger={passenger} onChangeSeat={handleChangeSeat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckIn;
