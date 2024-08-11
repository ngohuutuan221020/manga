const mongoose = require("mongoose");

module.exports = mongoose.model(
  "user",
  new mongoose.Schema({
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
    },
  })
);
