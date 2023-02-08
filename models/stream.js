const mongoose = require("mongoose");

const stream = new mongoose.Schema({
  streamName: { type: String, required: true },
  streamID: { type: Number, required: true },
});

module.exports = mongoose.model("Stream", stream);
