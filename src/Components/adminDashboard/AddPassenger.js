import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPassenger } from "../../store/actions/flightsActions";
import "./AddPassenger.css";

const AddPassenger = ({ selectedFlight }) => {
  const [name, setName] = useState("");
  const [passport, setPassport] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [ancillaryServices, setAncillaryServices] = useState([]);
  const [mealPreference, setMealPreference] = useState([]);
  const [inFlightShopRequests, setInFlightShopRequests] = useState([]);
  const [seatNumber, setSeatNumber] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [requiresWheelchair, setRequiresWheelchair] = useState(false);
  const [hasInfant, setHasInfant] = useState(false);
  const dispatch = useDispatch();

  const passengers = useSelector(
    (state) =>
      state.flights.flights.find((flight) => flight.id === selectedFlight.id)
        .passengers
  );

  const getAvailableSeats = () => {
    const allSeats = selectedFlight.seatLayout
      .flat()
      .filter((seat) => seat !== "");
    const assignedSeats = passengers.map((passenger) => passenger.seatNumber);
    return allSeats.filter((seat) => !assignedSeats.includes(seat));
  };

  const handleAddPassenger = () => {
    const newPassenger = {
      id: Date.now(),
      name,
      passport,
      address,
      dob,
      ancillaryServices,
      mealPreference,
      inFlightShopRequests,
      seatNumber,
      isCheckedIn,
      requiresWheelchair,
      hasInfant,
    };
    dispatch(addPassenger(selectedFlight.id, newPassenger));
    setName("");
    setPassport("");
    setAddress("");
    setDob("");
    setAncillaryServices([]);
    setMealPreference([]);
    setInFlightShopRequests([]);
    setSeatNumber("");
    setIsCheckedIn(false);
    setRequiresWheelchair(false);
    setHasInfant(false);
  };

  return (
    <div className="add-passenger">
      <h2>Add New Passenger</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Passport:</label>
          <input
            type="text"
            value={passport}
            onChange={(e) => setPassport(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ancillary Services:</label>
          <select
            value={ancillaryServices}
            onChange={(e) => setAncillaryServices([e.target.value])}
          >
            <option value="" disabled>
              Select Ancillary Service
            </option>
            {selectedFlight.ancillaryServices.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Meal Preference:</label>
          <select
            value={mealPreference}
            onChange={(e) => setMealPreference([e.target.value])}
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
        </div>
        <div>
          <label>In-Flight Shop Requests:</label>
          <select
            value={inFlightShopRequests}
            onChange={(e) => setInFlightShopRequests([e.target.value])}
          >
            <option value="" disabled>
              Select In-Flight Shopping Items
            </option>
            {selectedFlight.shoppingItems.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Seat Number:</label>
          <select
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
          >
            <option value="" disabled>
              Select Seat
            </option>
            {getAvailableSeats().map((seat, index) => (
              <option key={index} value={seat}>
                {seat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Checked In:</label>
          <input
            type="checkbox"
            checked={isCheckedIn}
            onChange={(e) => setIsCheckedIn(e.target.checked)}
          />
        </div>
        <div>
          <label>Requires Wheelchair:</label>
          <input
            type="checkbox"
            checked={requiresWheelchair}
            onChange={(e) => setRequiresWheelchair(e.target.checked)}
          />
        </div>
        <div>
          <label>Has Infant:</label>
          <input
            type="checkbox"
            checked={hasInfant}
            onChange={(e) => setHasInfant(e.target.checked)}
          />
        </div>
        <button type="button" onClick={handleAddPassenger}>
          Add Passenger
        </button>
      </form>
    </div>
  );
};

export default AddPassenger;
