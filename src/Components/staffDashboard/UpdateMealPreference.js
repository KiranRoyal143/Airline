import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlights } from "../../store/actions/flightsActions";

const UpdateMealPreference = ({
  passengers,
  flightId,
  onChangeMealPreference,
}) => {
  const flights = useSelector((state) => state.flights.flights);
  const flight = flights.find((flight) => flight.id === flightId);
  const [selectedFlight, setSelectedFlight] = useState(flight);
  const [mealPreferences, setMealPreferences] = useState({});
  const [selectedPassenger, setSelectedPassenger] = useState(null);
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

      const updatedPassenger = {
        ...selectedPassenger,
        mealPreference: [
          ...selectedPassenger.mealPreference,
          newMealPreference.trim(),
        ],
      };
      setSelectedPassenger(updatedPassenger);

      setMealPreferences((prev) => ({
        ...prev,
        [passengerId]: "",
      }));
    }
  };

  const handlePassengerSelection = (passenger) => {
    setSelectedPassenger(passenger);
  };

  if (!passengers || passengers.length === 0) {
    return <div>No passengers available</div>;
  }

  return (
    <div className="passenger-content">
      <h2>Passenger Details</h2>
      <select
        onChange={(e) =>
          handlePassengerSelection(
            passengers.find((p) => p.id === parseInt(e.target.value))
          )
        }
      >
        <option value="">Select a Passenger</option>
        {passengers.map((passenger) => (
          <option key={passenger.id} value={passenger.id}>
            {passenger.name}
          </option>
        ))}
      </select>
      {selectedPassenger && (
        <div className="mng">
          <div className="psname">
            <strong>Passenger Name:</strong>
            <span>{selectedPassenger.name}</span>
          </div>
          <div className="psname">
            <strong>Meal Preference:</strong>
            {Array.isArray(selectedPassenger.mealPreference) ? (
              <ul>
                {selectedPassenger.mealPreference.map((meal, index) => (
                  <li key={index}>{meal}</li>
                ))}
              </ul>
            ) : (
              <span>{selectedPassenger.mealPreference}</span>
            )}
          </div>
          <select
            className="texts"
            value={mealPreferences[selectedPassenger.id] || ""}
            onChange={(e) =>
              handleInputChange(selectedPassenger.id, e.target.value)
            }
          >
            <option value="" disabled>
              Select Meal Preference
            </option>
            {selectedFlight.meals.map((meal, index) => (
              <option key={index} value={meal}>
                {meal}
              </option>
            ))}
          </select>
          <button
            onClick={() => handleChangeMealPreference(selectedPassenger.id)}
          >
            Change Meal Preference
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateMealPreference;
