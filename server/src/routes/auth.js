const express = require("express");
const router = express.Router();
const { register, login, getAllUser } = require("../controller/authController");
const jsonwebtoken = require("../middleware/jsonwebtoken");
const jwt = require("jsonwebtoken");
router.post("/register", register);
router.post("/login", login);
require("dotenv").config();

router.get("/get-all-user", jsonwebtoken, getAllUser);

router.get("/get-profile", function (req, res) {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ EC: 1, EM: "No token provided" });
  const tokenHeader = token.split(" ")[1];
  if (!tokenHeader)
    return res.status(401).json({ EC: 1, EM: "No token provided" });
  try {
    jwt.verify(tokenHeader, process.env.SECRET_KEY, (err, user) => {
      if (err) return res.status(403).json({ EC: 1, EM: "Invalid token" });
      return res.status(200).json({
        EC: 0,
        EM: "User profile fetched successfully",
        DATA: user,
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      EC: 1,
      EM: "Server error",
    });
  }
});

module.exports = router;
