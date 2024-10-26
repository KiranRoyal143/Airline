import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlightList from "../FlightList";
import StaffNavigation from "./StaffNavigation";
import "./StaffDashboard.css";
import {
  fetchFlights,
  updatePassengerCheckIn,
  undoPassengerCheckIn,
  changePassengerSeat,
  updateAncillaryServices,
  updateSpecialMeals,
  addInFlightShopRequest,
} from "../../store/actions/flightsActions";

const StaffDashboard = () => {
  const [selectedFlight, setSelectedFlight] = React.useState(null);
  const flights = useSelector((state) => state.flights.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  useEffect(() => {
    if (selectedFlight) {
      const updatedFlight = flights.find(
        (flight) => flight.id === selectedFlight.id
      );
      setSelectedFlight(updatedFlight);
    }
  }, [flights, selectedFlight]);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handlePassengerCheckIn = (passengerId) => {
    dispatch(updatePassengerCheckIn(selectedFlight.id, passengerId));
  };

  const handleUndoPassengerCheckIn = (passengerId) => {
    dispatch(undoPassengerCheckIn(selectedFlight.id, passengerId));
  };

  const handlePassengerSeatChange = (passengerId, newSeat) => {
    dispatch(changePassengerSeat(selectedFlight.id, passengerId, newSeat));
  };

  const handleAncillaryService = (
    flightId,
    passengerId,
    newAncillaryServices
  ) => {
    dispatch(
      updateAncillaryServices(flightId, Number(passengerId), newAncillaryServices)
    );
  };

  const handleMealPreferenceChange = (passengerId, mealPreference) => {
    dispatch(
      updateSpecialMeals(selectedFlight.id, passengerId, mealPreference)
    );
  };

  const handleInFlightShopRequest = (passengerId, shopRequest) => {
    dispatch(
      addInFlightShopRequest(selectedFlight.id, passengerId, shopRequest)
    );
  };

  return (
    <div>
      {!selectedFlight ? (
        <div className="staffPage_SelectFlight">
          <div>
            <h2>Select a Flight</h2>
            <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
          </div>
        </div>
      ) : (
        <div>
          <StaffNavigation
            selectedFlight={selectedFlight}
            updatePassengerCheckIn={handlePassengerCheckIn}
            undoPassengerCheckIn={handleUndoPassengerCheckIn}
            changePassengerSeat={handlePassengerSeatChange}
            addAncillaryService={handleAncillaryService}
            changeMealPreference={handleMealPreferenceChange}
            addInFlightShopRequest={handleInFlightShopRequest}
          />
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
