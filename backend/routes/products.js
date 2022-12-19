var express = require("express");
var router = express.Router();
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");
const StatModel = require("../models/statistique.model");
const helpers = require("../helpers/slug");
const SalesModel = require("../models/ventes.model");
const RecentModel = require("../models/recent.model");
const ObjectID = require("mongoose").Types.ObjectId;

/** Gestions les produits de notre base de données */

//Retourner les statistiques
router.get("/stat", async (req, res) => {
  try {
    stat = await StatModel.find({});
    res.json({
      success: true,
      data: { stat },
      message: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
});

//Récupérer les ventes récentes
router.get("/sales", async (req, res) => {
  try {
    products = await SalesModel.find({}).sort({ _id: -1 }).limit(5);
    res.json({
      success: true,
      data: { products },
      message: "SUCCESS",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Les activités récentes
router.get("/recents", async (req, res) => {
  try {
    let recents = await RecentModel.find({}).sort({ _id: -1 }).limit(10);
    res.json({
      success: true,
      data: { recents },
      message: "SUCCESS",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Retourner la liste des catégories
router.get("/categories", async (req, res) => {
  try {
    categories = await CategoryModel.find({});
    res.json({
      success: true,
      data: { categories },
      message: "SUCCESS",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Retourner les produit par catégorie
router.get("/category/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await CategoryModel.findOne({ slug });
    let products = [];
    if (category)
      products = await ProductModel.find({ category_id: category._id });

    res.json({
      success: true,
      data: { products },
      message: "SUCCESS",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
});

//Créer une catégorie
router.post("/category", async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = helpers.slug(name);
    const category = await CategoryModel.create({
      name,
      description,
      slug,
    });
    res.json({
      success: true,
      data: { category: category._id },
      message: "SUCCESS",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Retourner la liste des produits
router.get("/", async (req, res) => {
  try {
    products = await ProductModel.find({});
    res.json({
      success: true,
      data: { products },
      message: "SUCCESS",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Enrégistrer un nouveau produit
router.post("/", async (req, res) => {
  try {
    const { name, quantity, price, category_id, url_pict } = req.body;
    const product = await ProductModel.create({
      name,
      quantity,
      price,
      category_id,
      url_pict,
    });
    await RecentModel.create({
      description: `Ajout d'un produit :  ${product.name}`,
    });
    res.json({
      success: true,
      data: { product: product._id },
      message: "SUCCESS",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Retourner les données d'un seul produit
router.get("/:id", (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      throw "ID not found";
    }
    ProductModel.findById(req.params.id, (err, docs) => {
      res.json({
        success: true,
        data: { product: docs },
        message: "SUCCESS",
      });
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Modifier les informations d'un produit
router.patch("/:id", (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      throw "ID not found";
    }
    ProductModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      async (err, docs) => {
        await RecentModel.create({
          description: `Modification des informations :  ${docs.name}`,
        });
        res.json({
          success: true,
          data: { product: docs },
          message: "SUCCESS",
        });
      }
    );
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

//Vendre un produit
router.patch("/sales/:id", (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      throw "ID not found";
    }
    ProductModel.findByIdAndUpdate(
      req.params.id,
      { $inc: { quantity: -1 * req.body.quantity } },
      async (err, docs) => {
        let vente = await SalesModel.create({
          name: docs.name,
          quantity: req.body.quantity,
          price: docs.price,
        });

        await RecentModel.create({
          description: `Vente de ${vente.quantity} ${vente.name}(s)`,
        });

        let heure = new Date().getHours();
        heure = (heure + "").length == 1 ? "0" + heure + "h" : heure + "h";

        await StatModel.findOneAndUpdate(
          { heure: heure },
          {
            $inc: {
              client: req.body.client,
              ventes: req.body.quantity,
              revenus: req.body.revenus,
            },
          }
        );
        res.json({
          success: true,
          data: { product: docs },
          message: "SUCCESS",
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error,
    });
  }
});

// Suppression d'un produit dans la base de données
router.delete("/:id", async (req, res) => {
  try {
    if (!ObjectID.isValid(req.params.id)) {
      throw "ID not found";
    }
    let product = await ProductModel.findOne({ _id: req.params.id });

    await ProductModel.deleteOne({ _id: req.params.id });
    await RecentModel.create({
      description: `Suppression d'un produit :  ${product.name}`,
    });
    res.json({
      success: true,
      message: "SUCCESS",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
});

module.exports = router;
