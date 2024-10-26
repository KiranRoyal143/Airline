import React from "react";
import "../adminDashboard/Navigation.css";

const AncillaryServices = ({ passengers }) => {
  if (!passengers || passengers.length === 0) {
    return <div>No passengers available</div>;
  }

  return (
    <div className="passenger-content">
      <h2>Passenger Details</h2>
      {passengers.map((passenger, index) => (
        <div className="passgen-Details" key={index}>
          <p className="psname">
            <strong>Name:</strong> {passenger.name}
          </p>
          <p className="psname">
            <strong>Ancillary Services:</strong>{" "}
            {passenger.ancillaryServices.join(", ")}
          </p>
          <p className="psname">
            <strong>Meal Preference:</strong> {passenger.mealPreference}
          </p>
          <p className="psname">
            <strong>In-flight Shop Requests:</strong>{" "}
            {passenger.inFlightShopRequests.join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AncillaryServices;
