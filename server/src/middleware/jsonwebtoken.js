const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ EC: 1, EM: "No token provided" });
  const tokenHeader = token.split(" ")[1];
  if (!tokenHeader)
    return res.status(401).json({ EC: 1, EM: "No token provided" });

  jwt.verify(tokenHeader, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ EC: 1, EM: "Invalid token" });

    if (user.role === "ADMIN") {
      req.user = user;
      console.log("jwt.verify ~ ROLE:", user?.role);
      next();
    } else {
      console.log("jwt.verify ~ error Role:", user?.role);
      return res.status(403).json({ EC: 1, EM: "Truy cập trái phép" });
    }
  });
};

module.exports = authenticate;
