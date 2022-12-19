const mongoose = require("mongoose");
const ProductModel = require("./product.model");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: String,
  description: {
    type: String,
    default: "",
  },
});

const CategoryModel = mongoose.model("category", categorySchema);
module.exports = CategoryModel;
