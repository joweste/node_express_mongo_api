const express = require("express");
const router = express.Router();
const User = require("../models/user");

const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).send({ message: "User not found" });
    }
    res.user = user;
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
  next();
};

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Getting One User
router.get("/:id", getUser, (req, res) => {
  res.send(res.user);
});

// Creating one User
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const user = new User({
    name,
    email,
  });
  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Updating One User
router.put("/:id", getUser, async (req, res) => {
  const { name, email } = req.body;
  if (name != null) {
    res.user.name = name;
  }
  if (email != null) {
    res.user.email = email;
  }
  try {
    const updatedUser = await res.user.save();
    res.send(updatedUser);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Deleting One
router.delete("/:id", getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.send({ message: "User was deleted" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
