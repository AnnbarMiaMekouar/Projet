import React, { useState } from "react";
import request from "../request";

const Product = ({ id, name, price, quantity, url, cat_id, categories }) => {
  const [client, setClient] = useState("");
  const [quant, setQuant] = useState("");
  const [loading, setLoading] = useState(false);
  //
  const [pr_name, setPrName] = useState(name);
  const [pr_price, setPrPrice] = useState(price);
  const [pr_quantity, setPrQuantity] = useState(quantity);
  const [pr_url, setPrUrl] = useState(url);
  const [cat, setCatId] = useState(cat_id);

  const onVenteButtonHandle = (e) => {
    setLoading(true);
    request
      .patch(`sales/${id}`, {
        quantity: quant,
        client,
        revenus: price * quant,
      })
      .then(({ data }) => {
        if (data.success) {
          window.location.reload();
        }
      });
  };
  const onModifButtonHandle = (e) => {
    setLoading(true);
    request
      .patch(`/${id}`, {
        name: pr_name,
        price: pr_price,
        quantity: pr_quantity,
        category_id: cat,
      })
      .then(({ data }) => {
        if (data.success) {
          window.location.reload();
        }
      });
  };

  const onDelButtonHandle = (e) => {
    setLoading(true);
    request.delete(`/${id}`).then(({ data }) => {
      if (data.success) {
        window.location.reload();
      }
    });
  };

  return (
    <div className="card col-8 col-sm-7 col-md-4 col-lg-3 mx-1">
      <img
        className="card-img-top"
        src={process.env.REACT_APP_BASE_API + "/assets/" + url}
        alt=""
      />
      <div className="card-body">
        <h6 className="text-center mt-2">{name}</h6>
        <div className="d-flex justify-content-evenly">
          <button
            className="produit btn btn-outline-success me-1"
            title="Vendre"
            data-bs-toggle="modal"
            data-bs-target={`#VendreProduit${name.replaceAll(" ", "_")}-1`}
          >
            <i className="bi bi-cart text-success"></i>
          </button>
          <div
            className="modal fade"
            id={`VendreProduit${name.replaceAll(" ", "_")}-1`}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Vendre: {name}</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="row g-3">
                    <div className="col-md-12">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Nombre client"
                        min="0"
                        value={client}
                        onChange={(e) => {
                          setClient(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Quantité"
                        min="0"
                        max={quantity}
                        value={quant}
                        onChange={(e) => {
                          setQuant(e.target.value);
                        }}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={onVenteButtonHandle}
                  >
                    {loading && <span>En cours...</span>}
                    {!loading && <span>Vendre</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            className="produit btn btn-outline-primary me-1"
            title="Modifier"
            data-bs-toggle="modal"
            data-bs-target={`#ModifierProduit${name.replaceAll(" ", "_")}-2`}
          >
            <i className="bi bi-pencil-square text-primary"></i>
          </button>
          <div
            className="modal fade"
            id={`ModifierProduit${name.replaceAll(" ", "_")}-2`}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modifier un produit</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="row g-3">
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Nom du produit"
                        value={pr_name}
                        onChange={(e) => setPrName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Quantité"
                        min="0"
                        value={pr_quantity}
                        onChange={(e) => setPrQuantity(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Prix en €"
                        min="0"
                        value={pr_price}
                        onChange={(e) => setPrPrice(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <select
                        value={cat}
                        className="form-select"
                        onChange={(e) => {
                          setCatId(e.target.value);
                        }}
                      >
                        {categories.map(({ _id, name }, ind) => {
                          return (
                            <option value={_id} key={`ind${ind}`}>
                              {name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Url de la photo"
                        value={pr_url}
                        onChange={(e) => setPrUrl(e.target.value)}
                        readOnly
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={onModifButtonHandle}
                  >
                    {loading && <span>En cours...</span>}
                    {!loading && <span>Modifier</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <button
            className="produit btn btn-outline-danger"
            title="Supprimer"
            data-bs-toggle="modal"
            data-bs-target={`#SupprimerProduit${name.replaceAll(" ", "_")}-3`}
          >
            <i className="bi bi-trash text-danger"></i>
          </button>
          <div
            className="modal fade"
            id={`SupprimerProduit${name.replaceAll(" ", "_")}-3`}
            tabIndex="-1"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Supprimer un produit</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <h2>{name}</h2>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={onDelButtonHandle}
                  >
                    {loading && <span>En cours...</span>}
                    {!loading && <span>Supprimer</span>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex mt-2">
          <div className="col-6">Quantité: {quantity}</div>
          <div className="col-6">Prix: {price} €</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
