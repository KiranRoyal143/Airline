import React from 'react';

function FlightDetails({ flight }) {
  return (
    <div>
      <h3>{flight.name}</h3>
      <p>Time: {flight.time}</p>
      <ul>
        {flight.passengers.map((passenger) => (
          <li key={passenger.id}>
            {passenger.name} - Seat: {passenger.seatNumber} - Checked-In:{' '}
            {passenger.isCheckedIn ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightDetails;
