const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.put("/addtofavorites", async (req, res) => {
  const { word, userId } = req.body;
  try {
    const user = await User.findById(userId);
    const favorites = user._doc?.favorites;
    const updateFavorites = () => {
      favorites.push(word);
      user.save();
      console.log(user);
      res.json({
        status: "success",
        message: "Favourites updated.",
        favorites,
      });
    };
    if (favorites) {
      if (!favorites.includes(word)) {
        updateFavorites();
      } else {
        res.json({
          status: "fail",
          message: "The word is already a favourite.",
        });
      }
    } else {
      updateFavorites();
    }
  } catch (err) {
    console.log(err);
  }
});
router.put("/removefromfavorites", async (req, res) => {
  const { word, userId } = req.body;
  try {
    const user = await User.findById(userId);
    let favorites = user._doc?.favorites;
    const updateFavorites = () => {
      user.favorites = favorites.filter((item) => item != word);
      user.save();
      res.json({
        status: "success",
        message: "Favourites updated.",
        favorites: user.favorites,
      });
    };
    if (favorites) {
      updateFavorites();
    } else {
      res.json({
        status: "fail",
        message: "The word is not a favourite.",
      });
    }
  } catch (err) {
    console.log(err);
  }
});
router.post("/user/set-history", async (req, res) => {
  const { userId, word } = req.body;
  try {
    const user = await User.findById(userId);
    let userHistory = user._doc.history;

    const addToHistory = () => {
      if (!userHistory) {
        userHistory = [];
      }
      userHistory.unshift(word);
      userHistory = userHistory.slice(0, 10);
      console.log(userHistory);
      return userHistory;
    };
    const updatedHistory = addToHistory();
    user._doc.history = updatedHistory;

    await user.save();
    res.json({
      status: "success",
      history: updatedHistory,
    });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
