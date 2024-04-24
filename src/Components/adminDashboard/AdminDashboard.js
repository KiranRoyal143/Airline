import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FlightList from "../FlightList";
import { fetchFlights } from "../../store/actions/flightsActions";
import Navigation from "./Navigation";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedFlight, setSelectedFlight] = React.useState(null);
  const flights = useSelector((state) => state.flights.flights);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFlights());
  }, [dispatch]);

  const handleSelectFlight = (flight) => {
    setSelectedFlight(flight);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <div>
      {selectedFlight === null && (
        <div className="adminPage_SelectFlight">
          <div>
            <h2>Select a Flight</h2>
            <FlightList flights={flights} onSelectFlight={handleSelectFlight} />
          </div>
        </div>
      )}
      {selectedFlight && (
        <div>
          <Navigation
            onSelectOption={handleSelectOption}
            selectedOption={selectedOption}
            selectedFlight={selectedFlight}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
