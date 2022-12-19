const mongoose = require("mongoose");

const statSchema = new mongoose.Schema(
  {
    heure: String,
    client: Number,
    ventes: Number,
    revenus: Number,
  },
  { timestamps: true }
);

const StatModel = mongoose.model("statistique", statSchema);
module.exports = StatModel;
