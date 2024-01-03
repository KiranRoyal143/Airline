// InFlightManagement.js
import React from "react";
import { useDispatch } from "react-redux"; // Import useDispatch
import PassengerList from "./PassengerList";
import AncillaryServiceList from "./AncillaryServiceList";
import PassengerDetails from "./PassengerDetails"; // Make sure to import the PassengerDetails component
import {
  addAncillaryService, // Import your action creators
  changeMealPreference,
  addInFlightShopRequest,
} from "../store/actions/flightsActions";

const InFlightManagement = ({ selectedFlight, onBack }) => {
  const passengers = selectedFlight.passengers;
  const dispatch = useDispatch();
  const specialMealsPassengers = passengers.filter(
    (passenger) => passenger.specialMeals && passenger.specialMeals.length > 0
  );

  const allAncillaryServices = passengers.reduce(
    (services, passenger) => [...services, ...passenger.ancillaryServices],
    []
  );

  const uniqueAncillaryServices = Array.from(new Set(allAncillaryServices));

  const handleAddAncillaryService = (passenger, newService) => {
    // Implement the logic to add ancillary service to the passenger
    dispatch(addAncillaryService(selectedFlight, passenger, newService));
  };

  const handleChangeMealPreference = (passenger, newMealPreference) => {
    // Implement the logic to change meal preference for the passenger
    dispatch(
      changeMealPreference(selectedFlight, passenger, newMealPreference)
    );
  };

  const handleAddInFlightShopRequest = (passenger, newItem) => {
    // Implement the logic to add in-flight shop request for the passenger
    dispatch(addInFlightShopRequest(selectedFlight, passenger, newItem));
  };
  return (
    <div>
      <h2>In-Flight Management</h2>
      <PassengerList passengers={passengers} />

      {/* ... (special meals section) */}

      {uniqueAncillaryServices.length > 0 && (
        <div>
          <h3>Ancillary Services Requested</h3>
          <ul>
            {uniqueAncillaryServices.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          <h3>Special Meals</h3>
          <ul>
            {specialMealsPassengers.map((passenger, index) => (
              <li key={index}>
                {passenger.name} - Special Meals:{" "}
                {passenger.specialMeals.join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        {passengers.map((passenger) => (
          <PassengerDetails
            key={passenger.id}
            passenger={passenger}
            onAddAncillaryService={handleAddAncillaryService}
            onChangeMealPreference={handleChangeMealPreference}
            onAddInFlightShopRequest={handleAddInFlightShopRequest}
          />
        ))}
      </div>
      <div>
        <button onClick={onBack}>Back</button>
      </div>
    </div>
  );
};

export default InFlightManagement;
