import React, { useEffect, useState } from "react";
import request from "../request";
import Product from "./product";
const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [categories, setCategories] = useState([]);
  //
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [url_pict, setUrl] = useState("default.jpg");
  const [cat_id, setCatId] = useState("placeholder");
  useEffect(() => {
    request.get("categories").then(({ data }) => {
      if (data.success) {
        setCategories(data.data.categories);
        request.get("/").then(({ data }) => {
          if (data.success) {
            setLoading(false);
            setData(data.data.products);
          }
        });
      }
    });
  }, []);

  const onAddButtonHandle = (e) => {
    setLoading2(true);
    request
      .post("/", {
        name: name,
        price: price,
        quantity: quantity,
        category_id: cat_id,
        url_pict: url_pict,
      })
      .then(({ data }) => {
        if (data.success) {
          window.location.reload();
        }
      });
  };

  return (
    <>
      <div
        className="my-2 btn-group"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          type="button"
          className="btn btn-outline-success"
          data-bs-toggle="modal"
          data-bs-target="#productModal"
        >
          Ajouter un produit
        </button>
      </div>
      <div className="modal fade" id="productModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un produit</h5>
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
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Quantité"
                    min="0"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Prix en €"
                    min="0"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                </div>
                <div className="col-md-12">
                  <select
                    value={cat_id}
                    onChange={(e) => {
                      setCatId(e.target.value);
                    }}
                    className="form-select"
                  >
                    <option value="placeholder">Catégorie...</option>
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
                    value={url_pict}
                    onChange={(e) => {
                      setUrl(e.target.value);
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
                onClick={onAddButtonHandle}
              >
                {loading2 && <span>En cours...</span>}
                {!loading2 && <span>Ajouter</span>}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 row justify-content-evenly align-items-center">
        {!loading &&
          data.map((prod, i) => (
            <Product
              key={prod._id}
              name={prod.name}
              price={prod.price}
              quantity={prod.quantity}
              id={prod._id}
              url={prod.url_pict}
              cat_id={prod.category_id}
              categories={categories}
            />
          ))}
        {loading && (
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="sr-only"></span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
