const mongoose = require("mongoose");

module.exports = mongoose.model(
  "chapter",
  new mongoose.Schema(
    {
      title: {
        type: String,
      },
      idManga: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "manga",
        required: true,
      },
      images: {
        type: [String],
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
