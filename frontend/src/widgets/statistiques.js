import React from "react";
const Statistique = ({ title, value, col, icon }) => {
  return (
    <div className={`col-xxl-4 ${col}`}>
      <div className="card info-card">
        <div className="card-body">
          <h5 className="card-title">
            {title} <span>| All time</span>
          </h5>

          <div className="d-flex align-items-center">
            <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
              <i className={`bi bi-${icon}`}></i>
            </div>
            <div className="ps-3">
              <h6>{value}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistique;
