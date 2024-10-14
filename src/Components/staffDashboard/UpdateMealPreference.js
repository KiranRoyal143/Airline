import React, { useState } from "react";

const UpdateMealPreference = ({ passengers, onChangeMealPreference }) => {
  const [mealPreferences, setMealPreferences] = useState({});

  const handleInputChange = (passengerId, value) => {
    setMealPreferences((prev) => ({
      ...prev,
      [passengerId]: value,
    }));
  };

  const handleChangeMealPreference = (passengerId) => {
    const newMealPreference = mealPreferences[passengerId]?.trim();
    if (newMealPreference) {
      onChangeMealPreference(passengerId, newMealPreference);
      setMealPreferences((prev) => ({
        ...prev,
        [passengerId]: "",
      }));
    }
  };

  return (
    <div className="passenger-content">
      <h2>Passenger Details</h2>
      {passengers.map((passenger) => (
        <div key={passenger.id}>
          <p>
            <strong>Name:</strong> {passenger.name}
          </p>
          <p>
            <strong>Meal Preference:</strong> {passenger.mealPreference}
          </p>
          <p>
            <input
              type="text"
              placeholder="New Meal Preference"
              value={mealPreferences[passenger.id] || ""}
              onChange={(e) => handleInputChange(passenger.id, e.target.value)}
            />
            <button onClick={() => handleChangeMealPreference(passenger.id)}>
              Change Meal Preference
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default UpdateMealPreference;
