const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
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
});

const SalesModel = mongoose.model("ventes", salesSchema);
module.exports = SalesModel;
