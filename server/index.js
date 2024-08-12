const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const manage = require("./src/routes/manage");
const auth = require("./src/routes/auth");

require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "https://professormanga.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "500mb" }));
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "500mb",
    parameterLimit: 500000,
  })
);

app.use("/v1/api", manage);
app.use("/v1/auth", auth);

app.get("/", (req, res) => res.send("Professor Manga"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));
