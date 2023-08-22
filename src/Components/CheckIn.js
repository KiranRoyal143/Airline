import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFlights } from "../store/actions/flightsActions";
import FlightList from "./FlightList";
import SeatMap from "./SeatMap";
import PassengerList from "./PassengerList";
import PassengerDetails from "./PassengerDetails";

const CheckIn = () => {
  const flights = useSelector((state) => state.flights.flights);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const dispatch = useDispatch(); // Get the dispatch function

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleSeatSelect = (selectedPassenger) => {
    // Implement your logic here to update passenger details
  };

  const handleChangeSeat = (passenger, newSeat) => {
    // Implement your logic here to change passenger seat
  };

  useEffect(() => {
    dispatch(fetchFlights()); // Use the imported action
  }, [dispatch]);

  return (
    <div>
      <h1>Airline Staff Check-In</h1>
      {!selectedFlight ? (
        <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
      ) : (
        <div>
          <h2>Selected Flight: {selectedFlight.flightNumber}</h2>
          {/* Display other flight details here */}
          <SeatMap
            passengers={selectedFlight.passengers}
            onSeatSelect={handleSeatSelect}
          />
          <PassengerList passengers={selectedFlight.passengers} />
          {selectedFlight.passengers.map((passenger) => (
            <PassengerDetails
              key={passenger.id}
              passenger={passenger}
              onChangeSeat={handleChangeSeat}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckIn;
