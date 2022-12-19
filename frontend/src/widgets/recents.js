import React, { useEffect, useState } from "react";
import request from "../request";
const Recent = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    request.get("recents").then(({ data }) => {
      if (data.success) {
        setRecent(data.data.recents);
      }
    });
  }, []);

  return (
    <div className="col-lg-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Dernières activités</h5>
          <div className="activity">
            {recent.map((rec, index) => {
              return (
                <div className="activity-item d-flex" key={`rec${index}`}>
                  <i className="bi bi-circle-fill activity-badge text-success align-self-start"></i>
                  <div className="activity-content">{rec.description}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recent;
