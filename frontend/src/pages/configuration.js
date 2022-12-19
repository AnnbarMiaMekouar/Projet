import React, { useState } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Sidebar from "../widgets/sidebar";
import Content from "../widgets/content";
import Categories from "../widgets/categories";
import Products from "../widgets/products";
import request from "../request";

const Configuration = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const onSaveButtonHandle = (e) => {
    setLoading(true);
    request
      .post(`/category`, {
        name,
        description,
      })
      .then(({ data }) => {
        if (data.success) {
          window.location.reload();
        }
      });
  };
  const { pathname } = useLocation();
  return (
    <div>
      <Sidebar>
        <Link to="/">
          <i className="bi bi-grid me-2"></i>
          Dashboard
        </Link>
        <Link
          to="/configuration/categories"
          className={`${
            pathname === "/configuration/categories" ? "active" : ""
          }`}
        >
          <i className="bi bi-menu-button-wide me-2"></i>
          Catégories
        </Link>
        <Link
          to="/configuration/products"
          className={`${
            pathname === "/configuration/products" ? "active" : ""
          }`}
        >
          <i className="bi bi-cart me-2"></i>
          Produits
        </Link>
      </Sidebar>
      <Content>
        <Switch>
          <Route path="/configuration/categories">
            <div
              className="mt-2 mb-3 btn-group"
              role="group"
              aria-label="Basic outlined example"
            >
              <button
                type="button"
                className="btn btn-outline-success"
                data-bs-toggle="modal"
                data-bs-target="#categorieModal"
              >
                Ajouter une catégorie
              </button>
            </div>
            <div className="modal fade" id="categorieModal" tabIndex="-1">
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Ajouter une catégorie</h5>
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
                          placeholder="Nom de la catégorie"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="col-md-12">
                        <textarea
                          className="form-control"
                          placeholder="Description"
                          style={{ height: "100px" }}
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
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
                      onClick={onSaveButtonHandle}
                    >
                      {loading && <span>En cours...</span>}
                      {!loading && <span>Ajouter</span>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Categories />
          </Route>
          <Route path="/configuration/products">
            <Products />
          </Route>
        </Switch>
      </Content>
    </div>
  );
};

export default Configuration;
