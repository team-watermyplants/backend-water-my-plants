require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../../data/dbConfig");
const auth = require("../../auth/auth");

function checkRegistration(req, res, next) {
  if (
    !req.body.username ||
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.phoneNumber ||
    !req.body.password
  ) {
    res
      .status(400)
      .json({ message: "Please enter information for all required fields." });
  } else {
    next();
  }
}

function hashPassword(req, res, next) {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    Number(process.env.HASH_ROUNDS)
  );
  next();
}

router.post("/", checkRegistration, hashPassword, async (req, res) => {
  let ids = await db("users").insert(req.body);
  let user = await db("users")
    .where({ id: ids[0] })
    .first();
  let token = auth.generateToken(user);

  res
    .status(201)
    .json({ message: "Successfully created new user", : ids[0], token, user: user[0] });
});

module.exports = router;
