// InFlightManagement.js
import React from "react";
import PassengerList from "./PassengerList";
import AncillaryServiceList from "./AncillaryServiceList";
import PassengerDetails from "./PassengerDetails"; // Make sure to import the PassengerDetails component

const InFlightManagement = ({ selectedFlight }) => {
  const passengers = selectedFlight.passengers;

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
  };

  const handleChangeMealPreference = (passenger, newMealPreference) => {
    // Implement the logic to change meal preference for the passenger
  };

  const handleAddInFlightShopRequest = (passenger, newItem) => {
    // Implement the logic to add in-flight shop request for the passenger
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
    </div>
  );
};

export default InFlightManagement;
