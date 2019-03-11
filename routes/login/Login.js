require("dotenv").config();

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../../data/dbConfig");
const auth = require("../../auth/auth");

module.exports = router;
