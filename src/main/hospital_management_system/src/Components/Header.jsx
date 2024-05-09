import React from "react";
import {Link} from "react-router-dom";


const Header = () => {
  return (
    <div>
      <br></br>
      <Link to="/patient">
        <button className="btn btn-primary px-4" data-testid="PatientRecords">
          Patient Records
        </button>
      </Link>
      <Link to="/appointment">
        <button className="btn btn-warning ms-5 px-4" data-testid="Appointment Records">
          Appointment Records
        </button>
      </Link>
      <Link to="/doctor">
        <button className="btn btn-primary ms-5 px-4" data-testid="Doctor Records">
          Doctor Records
        </button>
      </Link>
      <br></br>
    </div>
  );
};

export default Header;
