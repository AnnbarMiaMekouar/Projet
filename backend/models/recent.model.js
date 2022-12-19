const mongoose = require("mongoose");

const recentSchema = new mongoose.Schema({
  description: String,
});

const RecentModel = mongoose.model("recent", recentSchema);
module.exports = RecentModel;
