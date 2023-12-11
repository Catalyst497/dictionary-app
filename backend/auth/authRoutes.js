const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const JSON_SECRET = process.env.JSON_SECRET;

router.get("/protectedroute", (req, res) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("No token found.");
  } else {
    jwt.verify(token, JSON_SECRET, async (err, decoded) => {
      try {
        if (err) {
          res.json({ auth: false, message: "You failed to authenticate" });
        } else {
          req.userId = decoded.userid;
          let user = await User.findById(decoded.userId);
          user = { ...user._doc, password: null };

          res.json({
            auth: true,
            message: "Yeah, User is logged in.",
            user,
          });
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
});
router.post("/login", async (req, res) => {
  if (!req.body.username)
    return res.send({
      message: "You have not inputed your username.",
    });
  if (!req.body.password)
    return res.send({ message: "Please enter your password." });
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username }).exec();
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, JSON_SECRET, {
          expiresIn: "1h",
        });
        console.log("Successful login");
        const openUser = { ...user._doc, password: null };
        res.json({
          message: "Successful Login",
          token,
          user: openUser,
        });
      } else {
        res.send({ message: "Please enter the correct passowrd." });
      }
    } else {
      res.send({ message: "User does not exist in database" });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  if (!email) return res.send({ message: "Please enter your email address." });
  if (
    null ==
    email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  )
    return res.send({ message: "Please enter a valid email address." });
  if (!password) return res.send({ message: "Please enter your password." });
  if (!username) return res.send({ message: "Please enter your username." });
  User.findOne({ email }).then((user) => {
    if (user) return res.json({ message: "User already exists." });
    else {
      const newUser = new User(req.body);
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.log(err);
          newUser.password = hash;
          newUser.save().catch((err) => console.log(err));
          res.json({ message: "Sign up successful." });
        });
      });
    }
  });
});

module.exports = router;
