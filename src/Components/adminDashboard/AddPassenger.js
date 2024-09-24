import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPassenger } from "../../store/actions/flightsActions";

const AddPassenger = ({ selectedFlight }) => {
  const [name, setName] = useState("");
  const [passport, setPassport] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [ancillaryServices, setAncillaryServices] = useState([]);
  const [mealPreference, setMealPreference] = useState("");
  const [inFlightShopRequests, setInFlightShopRequests] = useState([]);
  const [seatNumber, setSeatNumber] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [requiresWheelchair, setRequiresWheelchair] = useState(false);
  const [hasInfant, setHasInfant] = useState(false);
  const dispatch = useDispatch();

  const handleAddPassenger = () => {
    const newPassenger = {
      id: Date.now(), // Unique ID for the new passenger
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
    setMealPreference("");
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
          <input
            type="text"
            value={ancillaryServices}
            onChange={(e) => setAncillaryServices(e.target.value.split(","))}
          />
        </div>
        <div>
          <label>Meal Preference:</label>
          <input
            type="text"
            value={mealPreference}
            onChange={(e) => setMealPreference(e.target.value)}
          />
        </div>
        <div>
          <label>In-Flight Shop Requests:</label>
          <input
            type="text"
            value={inFlightShopRequests}
            onChange={(e) => setInFlightShopRequests(e.target.value.split(","))}
          />
        </div>
        <div>
          <label>Seat Number:</label>
          <input
            type="text"
            value={seatNumber}
            onChange={(e) => setSeatNumber(e.target.value)}
          />
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
