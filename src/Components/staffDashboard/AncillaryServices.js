import React from "react";
import "../adminDashboard/Navigation.css"

const AncillaryServices = ({ passengers }) => {
  return (
    <div className="passenger-content">
      <p className="passgen-Details">
        <div className="mng">
          <p className="psname">
            <h2>Passenger Details</h2>
            {passengers.map((passenger, index) => (
              <div key={index}>
                <p>
                  <strong>Name:</strong> {passenger.name}
                </p>
                <p>
                  <strong>Ancillary Services:</strong>{" "}
                  {passenger.ancillaryServices.join(", ")}
                </p>
                <p>
                  <strong>Meal Preference:</strong> {passenger.mealPreference}
                </p>
                <p>
                  <strong>In-flight Shop Requests:</strong>{" "}
                  {passenger.inFlightShopRequests.join(", ")}
                </p>
              </div>
            ))}
          </p>
        </div>
      </p>
    </div>
  );
};

export default AncillaryServices;
