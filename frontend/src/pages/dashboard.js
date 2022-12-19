import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import request from "../request";
import Chart from "../widgets/chart";
import Content from "../widgets/content";
import Recent from "../widgets/recents";
import RecentSales from "../widgets/recentSales";
import Sidebar from "../widgets/sidebar";
import Statistique from "../widgets/statistiques";

const Dashboard = () => {
  const [data, setData] = useState([]);
  let ventes = data.reduce((acc, cur) => cur.ventes + acc, 0);
  let client = data.reduce((acc, cur) => cur.client + acc, 0);
  let revenus = data.reduce((acc, cur) => cur.revenus + acc, 0);
  useEffect(() => {
    request.get("stat").then(({ data }) => {
      if (data.success) {
        setData(data.data.stat);
      }
    });
  }, []);
  return (
    <div>
      <Sidebar>
        <NavLink className="active" to="/">
          <i className="bi bi-grid me-2"></i>
          Dashboard
        </NavLink>
        <NavLink to="/configuration/categories">
          <i className="bi bi-wrench me-2"></i>
          Configuration
        </NavLink>
      </Sidebar>
      <Content>
        <div className="row pt-3">
          <div className="col-lg-8">
            <div className="row">
              <Statistique
                title="Ventes"
                value={ventes}
                col="col-md-6"
                icon="cart"
              />
              <Statistique
                title="Revenus"
                value={`${revenus} €`}
                col="col-md-6"
                icon="currency-euro"
              />
              <Statistique
                title="Clients"
                value={client}
                col="col-md-12"
                icon="people"
              />
            </div>
            <Chart data={data} />
            <RecentSales />
          </div>
          <Recent />
        </div>
      </Content>
    </div>
  );
};

export default Dashboard;
