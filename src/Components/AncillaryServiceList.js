// AncillaryServiceList.js
import React from "react";

const AncillaryServiceList = ({ services }) => {
  return (
    <div>
      <h3>Ancillary Service List</h3>
      <ul>
        {services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      {/* Implement options to manage ancillary services (add/update/delete) */}
    </div>
  );
};

export default AncillaryServiceList;
