import React, { useEffect, useState } from "react";
import request from "../request";
const RecentSales = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    request.get("sales").then(({ data }) => {
      if (data.success) {
        setData(data.data.products);
      }
    });
  }, []);
  return (
    <div className="col-12">
      <div className="card  overflow-auto">
        <div className="card-body">
          <h5 className="card-title">
            Ventes récentes <span>| Aujourd'hui</span>
          </h5>

          <table className="table table-borderless datatable">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Produit</th>
                <th scope="col">Prix</th>
                <th scope="col">Quantité</th>
              </tr>
            </thead>
            <tbody>
              {data.map((prod, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">#{i + 1} </th>
                    <td>{prod.name}</td>
                    <td>{prod.price} €</td>
                    <td>{prod.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentSales;
