const express = require("express");
const app = express();
const passport = require("passport");
const User = require("./models/User.model");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const authRoutes = require('./auth/authRoutes')
const userRoutes = require('./auth/userRoutes')
require("dotenv").config();
const JSON_SECRET = process.env.JSON_SECRET;

require("./helpers/init_mongodb");
require("./auth/auth_config");

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

// Routes
app.use(authRoutes)
app.use(userRoutes)

app.get("/", (req, res) => {
  res.send("Hello World. Backend is connected.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => (err ? console.log(err) : console.log("Plus Ultra")));
