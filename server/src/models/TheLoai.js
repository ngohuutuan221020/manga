const mongoose = require("mongoose");

module.exports = mongoose.model(
  "theloai",
  new mongoose.Schema(
    {
      TenTheLoai: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  )
);
