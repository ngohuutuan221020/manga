const mongoose = require("mongoose");

module.exports = mongoose.model(
  "manga",
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      coverImage: {
        type: String,
      },
      description: {
        type: String,
      },
      totalView: {
        type: Number,
      },
      topHot: {
        type: String,
      },
      star: {
        type: String,
      },
      author: {
        type: String,
      },
      genre: {
        type: [String],
      },
      status: {
        type: String,
        enum: {
          values: ["Hoàn thành", "Đang tiến hành", "Đã bỏ"],
          message: "{VALUE} is not a valid status",
        },
      },
    },
    {
      timestamps: true,
    }
  )
);
