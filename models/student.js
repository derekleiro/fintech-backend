const mongoose = require("mongoose");

const student = new mongoose.Schema({
  studentName: { type: String, required: true },
  studentStream: { type: Number, required: true },
  studentID: { type: Number, required: true },
});

module.exports = mongoose.model("Student", student);
