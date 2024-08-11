const mongoose = require("mongoose");

module.exports = mongoose.model(
  "manga",
  new mongoose.Schema(
    {
      TenTruyen: {
        type: String,
        required: true,
      },
      AvtTruyen: {
        type: String,
      },
      GioiThieuTruyen: {
        type: String,
      },
      TotalView: {
        type: Number,
      },
      TopHot: {
        type: String,
      },
      TacGia: {
        type: String,
      },
      TheLoai: {
        type: [String],
      },
      TrangThai: {
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
