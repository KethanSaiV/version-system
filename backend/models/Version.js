const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema({
  recordId: mongoose.Schema.Types.ObjectId,
  versionNumber: Number,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Version", versionSchema);
