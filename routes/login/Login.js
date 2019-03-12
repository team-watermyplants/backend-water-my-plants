require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../../data/dbConfig");
const auth = require("../../auth/auth");

function checkLogin(req, res, next) {
  if (req.body.username && req.body.password) {
    next();
  } else {
    res.status(400).json({ message: "Please enter a username and password." });
  }
}

async function findUser(req, res, next) {
  let user = await db("users")
    .where({ username: req.body.username })
    .first();

  if (!user) {
    res
      .status(404)
      .json({ message: "Can't find that username in our database" });
  } else {
    req.user = user;
    next();
  }
}

function checkPassword(req, res, next) {
  if (req.user && bcrypt.compareSync(req.body.password, req.user.password)) {
    next();
  } else {
    res.status(401).json({ message: "Incorrect password" });
  }
}

router.post("/", checkLogin, findUser, checkPassword, async (req, res) => {
  if (req.user) {
    let token = auth.generateToken(req.user);
    res
      .status(200)
      .json({ message: "Login Success", username: req.user.username, token });
  }
});

module.exports = router;
