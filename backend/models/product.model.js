const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: true,
  },
  category_id: {
    type: mongoose.ObjectId,
    required: true,
  },
  url_pict: {
    type: String,
    default: "default.jpg",
  },
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = ProductModel;
