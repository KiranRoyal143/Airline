import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlightList from "../FlightList";
import {
  fetchFlights,
  updatePassengerName,
  updatePassportDetails,
  updateAddressDetails,
  updateAncillaryServices,
  updateSpecialMeals,
  deleteAncillaryService,
  updateShoppingItems,
  deleteShoppingItem,
} from "../../store/actions/flightsActions";
import Navigation from "./Navigation";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedFlight, setSelectedFlight] = React.useState(null);
  const flights = useSelector((state) => state.flights.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleUpdatePassengerName = (flightId, passengerId, newName) => {
    const stringPassengerId = passengerId.toString();
    dispatch(updatePassengerName(flightId, stringPassengerId, newName));
  };

  const handleUpdatePassportDetails = (
    flightId, passengerId,
    newPassportDetails
  ) => {
    dispatch(updatePassportDetails(flightId, passengerId, newPassportDetails));
  };

  const handleUpdateAddressDetails = (
    flightId, passengerId,
    newAddressDetails
  ) => {
    dispatch(updateAddressDetails(flightId, passengerId, newAddressDetails));
  };

  const handleAncillaryServices = (
    flightId, passengerId,
    newAncillaryServices
  ) => {
    dispatch(
      updateAncillaryServices(flightId, passengerId, newAncillaryServices)
    );
  };

  const handleSpecialMeals = (flightId, passengerId, newSpecialMeals) => {
    dispatch(updateSpecialMeals(flightId,passengerId, newSpecialMeals));
  };

  const handleDeleteAncillaryServices = (flightId, passengerId, serviceId) => {
    dispatch(deleteAncillaryService(flightId, passengerId, serviceId));
  };

  const handleShoppingItems = (flightId, passengerId, serviceId) => {
    dispatch(updateShoppingItems(flightId, passengerId, serviceId));
  };

  const handleDeleteShoppingItem = (flightId, passengerId, selectedItem) => {
    dispatch(deleteShoppingItem(flightId, passengerId, selectedItem));
  };

  return (
    <div>
      {!selectedFlight ? (
        <div className="adminPage_SelectFlight">
          <div>
            <h2>Select a Flight</h2>
            <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
          </div>
        </div>
      ) : (
        <div>
          <Navigation
            selectedFlight={selectedFlight}
            updatePassengerName={handleUpdatePassengerName}
            handlePassportDetails={handleUpdatePassportDetails}
            handleAddressDetails={handleUpdateAddressDetails}
            handleAncillaryServices={handleAncillaryServices}
            handleSpecialMeals={handleSpecialMeals}
            handleDeleteAncillaryServices={handleDeleteAncillaryServices}
            handleShoppingItems={handleShoppingItems}
            handleDeleteShoppingItem={handleDeleteShoppingItem}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
