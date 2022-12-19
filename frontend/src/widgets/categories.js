import React, { useEffect, useState } from "react";
import request from "../request";
const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState([]);
  const [description, setDescription] = useState([]);
  useEffect(() => {
    request.get("categories").then(({ data }) => {
      if (data.success) {
        setLoading(false);
        setCategories(data.data.categories);
      }
    });
  }, []);
  const handlechange = function (index, e) {
    if (e.target.name === "name") {
      let copy = name.slice();
      copy[index] = e.target.value;
      setName(copy);
    } else {
      let copy = description.slice();
      copy[index] = e.target.value;
      setDescription(copy);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Catégories de produits</h5>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        ) : (
          <table className="table table-hover" align="center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Nom</th>
                <th scope="col">Description</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                name.push(cat.name);
                description.push(cat.description);
                return (
                  <tr key={index}>
                    <th width="2%" scope="row">
                      {index + 1}
                    </th>
                    <td width="30%">{cat.name}</td>
                    <td>{cat.description}</td>
                    <td width="5%">
                      <div className="d-flex justify-content-center">
                        <button
                          className="categorie btn btn-outline-primary me-2"
                          data-bs-toggle="modal"
                          data-bs-target={`#editCategorie${index + 1}`}
                        >
                          <i className="bi bi-pencil-square text-primary"></i>
                        </button>
                        <div
                          className="modal fade"
                          id={`editCategorie${index + 1}`}
                          tabIndex="-1"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">
                                  Modifier la catégorie
                                </h5>
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
                                      value={name[index]}
                                      name="name"
                                      onChange={(e) => handlechange(index, e)}
                                    />
                                  </div>
                                  <div className="col-md-12">
                                    <textarea
                                      className="form-control"
                                      placeholder="Description"
                                      style={{ height: "100px" }}
                                      onChange={(e) => handlechange(index, e)}
                                      name="description"
                                      value={description[index]}
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
                                  onClick={() => setLoading1(true)}
                                >
                                  {loading1 && <span>En cours...</span>}
                                  {!loading1 && <span>Modifier</span>}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <button
                          className="categorie btn btn-outline-danger"
                          data-bs-toggle="modal"
                          data-bs-target={`#delCategorie${index + 1}`}
                        >
                          <i className="bi bi-trash text-danger"></i>
                        </button>
                        <div
                          className="modal fade"
                          id={`delCategorie${index + 1}`}
                          tabIndex="-1"
                        >
                          <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5 className="modal-title">
                                  Supprimer une catégorie
                                </h5>
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body">
                                <h2>{name[index]}</h2>
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
                                >
                                  {loading1 && <span>En cours...</span>}
                                  {!loading1 && <span>Supprimer</span>}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Categories;
