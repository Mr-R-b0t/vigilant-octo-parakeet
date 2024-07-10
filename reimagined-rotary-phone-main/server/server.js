const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");

const corsOption = {
  credentials: true, // Authentication cookies
  origin: "*",
};

app.use(cookieParser());
app.use(cors(corsOption));

// Models
const db = require("./app/models");
//db.connex.sync();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Root route to display a welcome message.
 *
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 */
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// Router setup
require("./app/routes/product.route")(app);
require("./app/routes/user.route")(app);
require("./app/routes/checkout.route")(app);

const PORT = process.env.PORT || 8008;

/**
 * Start the Express server.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;